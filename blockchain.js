const {Block,BlockHeader,txin,txout,Transaction}=require('./block');
const moment=require('moment');
const minTxns=require("./utility/algorithm")
const {wallet}=require('./wallet')
const { createHash } = require('crypto');
const { doubleHashLoop,publicKeyHashfunc }= require('./utility/hashUtility')


const coinbaseReward=0.00001

class BlockChain{
    constructor(){
        this.length=1 
        this.blockchain=[this.#getGenesisBlock()]
    }
    #getGenesisBlock(){
        let blockHeader=new BlockHeader(1,null,"0x1bc3300000000000000000000000000000000000000000000",moment().unix(),null,null)

        return new Block(1,blockHeader,null)
    }



    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().currentBlockhash;//later see see
        newBlock.mineBlock(this.getLatestBlock());
        this.blockchain.push(newBlock);
        //is this supposed to call class from network to broadcast the block to the network? lec7 page 13

        //everytime a new block added, UTXO updated
        //Call storage for updating the cache
        newBlock.Transaction.txID
    }

    isChainValid() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i]
            const previousBlock = this.blockchain[i - 1]
            
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    scanUnspentTx(addresses){
        var map=new Map()
        for (var block of this.blockchain) {
            if(block.blockIndex==1){
                continue
            }
            for(var tx of block.txns){
                for(var txin of tx.txin){
                    if (txin!='coinbase' && addresses.has(txin.fromAddress)){
                        map.delete(txin.utxo+txin.index.toString())
                    }
                }
                for(var i =0; i<tx.txoutputCount;i++){
                    if (addresses.has(tx.txout[i].toAddress)){
                        map.set(block.blockIndex.toString()+':'+tx.txid+':'+i.toString(),tx.txout[i].amount)
                    }
                }
            }
        }
        return map
    }
    //tempTxInfo[0]=blockIndex,tempTxInfo[1]=txid,tempTxInfo[2]=vout Index=>my unspent address
    createTransaction(sendToAddress,amount,fee=0.00001){
        var resultTxOut=[]  
        var resultTxIn=[]
        var balance=0
        var resultTx //resulted tx
        var utxo=this.scanUnspentTx(wallet.walletAddress)
        var txid
        var inputAddress=[]  //all wallet addresses used in txin
        utxo=minTxns.minTxns(utxo,amount+fee)
        if(utxo==false)return 0
        for (var address of utxo){
            // if(address==undefined){
            //     continue
            // }
            balance+=address[1]
            var tempTxInfo=address[0].split(':')
            var tempTx=this.searchTxWithIndex(tempTxInfo[1],tempTxInfo[0])
            var myAddress=tempTx.txout[tempTxInfo[2]].toAddress
            inputAddress.push(myAddress)
            var tempTxin=new txin(tempTx.txout[tempTxInfo[2]].toAddress,tempTxInfo[1],tempTxInfo[2],null)
            tempTxin=wallet.signTransaction(tempTxin,myAddress,tempTxInfo[1])
            resultTxIn.push(tempTxin)
        }
        var timeNow=moment().unix().toString()
        if(balance==amount+fee){
            var txoutObj=new txout(sendToAddress,amount,sendToAddress)
            resultTxOut.push(txoutObj)
            resultTx=new Transaction(sendToAddress,amount,resultTxIn,resultTxOut,fee,timeNow)
        }else{
            var change=new txout(inputAddress[0],balance-amount,inputAddress[0])
            resultTxOut.push(change)
            var txoutObj=new txout(sendToAddress,amount,sendToAddress)
            resultTxOut.push(txoutObj)
            resultTx=new Transaction(sendToAddress,amount,resultTxIn,resultTxOut,fee,timeNow)
        }
        return resultTx
    }

    isTransactionValid(tx){
        var checked=true
        if(tx.txin[0]=="coinbase" && tx.txinCount==1){
            return true
        }
        for (var i=0;i<tx.txinCount;i++){
            if(tx.txin[i]=="coinbase"){
                continue
            }
            console.log(tx.txin)
            var publicKeyHash=tx.txin[i].fromAddress   //this.txout[i].utxo.txout.lockScript
            var [signature,publicKey]=tx.txin[i].unlockScript
            if(!(this.isTxNotSpent(tx.txin[i].utxo)) || !(this.searchTxInBlock(tx.txin[i].utxo)) ||!(this.isTxHashValid(tx))){
                return false
            }
            if(publicKeyHashfunc(Buffer.from(tx.txid))==publicKeyHash){
                const verify=createVerify('SHA256')
                verify.update(Buffer.from(publicKeyHash))
                verify.end()
                if(!verify.verify(Buffer.from(publicKey),signature)){
                    checked=false
                }
            }
        }
        return(checked)
        //retrun true only when signature is the same, the txid is not in spent before, tx exist
    }

    isTxHashValid(tx){
        const hash=createHash('sha256')
        var tmepHash = hash.copy()
        for (var txin of tx.txin){
            hash.update(Buffer.from(JSON.stringify(txin)))
        }
        for(var txout of tx.txout){
            hash.update(Buffer.from(JSON.stringify(txout)))
        }
        hash.update(tx.timestamp)
        tmepHash.update(hash.digest())
        var result = tmepHash.digest('hex')
        if (result==tx.txid){
            return true
        }else{
            return false
        }
    }

    isTxNotSpent(txid){
        for (var block of this.blockchain) {
            if(block.blockIndex==1){
                continue
            }
            for(var tx of block.txns){
                for(var txin of tx.txin){
                    if(txin.utxo==txid){
                        return false
                    }
                }
            }
        }
        return(true)
    }
    //blcok => the minning block, address=> address that miner want the reward to 
    createCoinbaseTx(block,address){
        var totalTxFee=0
        for(e in block.txns){
            totalTxFee+=e.fee
        }
        var txOut=new txout(address,totalTxFee+coinbaseReward,address)
        var resultTx=new Transaction(address,totalTxFee+coinbaseReward,['coinbase'],[txOut],0,moment().unix().toString())
        return resultTx
    }

    searchTxWithIndex(txid,blockIndex){
        for(var tx of this.blockchain[parseInt(blockIndex)-1].txns){
            if(txid==tx.txid){
                return(tx)
            }
        }
        return(null)
    }

    //find block transaction from database
    searchTxInBlock(txid){
        for (var block of this.blockchain) {
            if(block.blockIndex==1){
                continue
            }
            for(var tx of block.txns){
                if(txid==tx.txid){
                    return(tx)
                }
            }
        }
        return(false)
    }

}

module.exports={BlockChain}