const {Block,BlockHeader,txin,txout,Transaction}=require('./block');
const moment=require('moment');
const minTxns=require("./utility/algorithm")
const {wallet}=require('./wallet')
const { createHash, KeyObject } = require('crypto');
const { doubleHashLoop,publicKeyHashfunc }= require('./utility/hashUtility')
const {LinkedList}=require('./utility/linkList')


const coinbaseReward=0.00001
class BlockChain{
    static stopMining=false
    static length=1
    constructor(){
        this.txPool=new LinkedList()
        this.blockchain=[this.#getGenesisBlock()]


        //testing
        wallet.importPrivateKey("308184020100301006072a8648ce3d020106052b8104000a046d306b020101042047eba4323fe49eb1e4ff406207f484bd56b00af180da380d4cfe2c7ae8550dfda14403420004afbe7934ab7ce1c7ebf01b56c675a05a86a5d0eb4764b0414eabb118ccee990d16003eb55e095a3ec631181ced898aba2162ab8a2a79e2d08b11ebf7bfc6525c");
        wallet.importPrivateKey("308184020100301006072a8648ce3d020106052b8104000a046d306b020101042048c7d7391eb2809703fc3c1e7b3a4e1dc92a130bfbc6182e0849cd19b8d783c3a14403420004fc977c70de2066e2d8e27ac1e5a61d2194059a3bbc5c66bda637227c29b3fe39b80696965e0dbcf1d1ba073cda002e7f5384bba083fb060210cc7b0507ac519f");
        // var coinBaseTx=this.createCoinbaseTx([],'1qwFqhokiTASXVSTqQyNAuit6qfbMpx');
        // var blockheaderObj= new BlockHeader('1',null,'1701107223');
        // var blockObj=new Block(2,blockheaderObj,[coinBaseTx]);
        // this.blockchain.push(blockObj);
        // this.length+=1
        // var coinBaseTx=this.createCoinbaseTx([this.createTransaction("1UK87hKPfkepZNgjE8bLaqrUj2o8dG5",0.000005,0.000005)],'1qwFqhokiTASXVSTqQyNAuit6qfbMpx');
        // var blockheaderObj= new BlockHeader('1',null,'1701107223');
        // var blockObj=new Block(3,blockheaderObj,[coinBaseTx,this.createTransaction("1UK87hKPfkepZNgjE8bLaqrUj2o8dG5",0.000005,0.000005)]);
        // this.blockchain.push(blockObj);
        // this.length+=1
    }
    #getGenesisBlock(){
        let blockHeader=new BlockHeader("0x0","1701332276")

        return new Block(1,blockHeader,[null])
    }



    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }


    // mineBlock(block) {
    //     let hash = doubleHashLoop(block.blockHeader)
    //     while (hash.substring(0, 4) !== '0'.repeat(block.blockHeader.difficulty)) {
    //         if(this.length==block.blockIndex){
    //             return(0)
    //         }
    //         block.blockHeader.nonce+=1
    //         hash = doubleHashLoop(block.blockHeader)

    //         console.log(hash)
    //         console.log(block.blockHeader.nonce)
    //     }
    //     block.currentBlockHash=hash
    //     return(block)
        
    // }
    //parameter is a block class object
    isBlockValid(block){
        var hash=doubleHashLoop(block.blockHeader)
        if(hash==block.currentBlockHash && block.blockHeader.previousBlockHeader==this.getLatestBlock().currentBlockHash){
            var totalTxFee=0
            for(var e of block.txns){
                totalTxFee+=e.fee
            }
            if (totalTxFee+coinbaseReward>=block.txns[0].amount){
                return true
            }

        }
        return false
    }

    isTxExist(tx){
        return this.txPool.find(tx)
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

    isBlockExist(incomingBlock){
        for(var block of this.blockchain){
            if(block.currentBlockHash==incomingBlock.currentBlockHash){
                return true
            }
        }
        return(false)
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
                        map.forEach((value,key)=>{
                            if(key.split(':')[1]==txin.utxo){
                                map.delete(key)
                            }
                        })
                    }
                }
                for(var i =0; i<tx.txoutputCount;i++){
                    if (addresses.has(tx.txout[i].toAddress)){
                        map.set(block.blockIndex.toString()+':'+tx.txid+':'+i.toString()+':'+tx.txout[i].toAddress.toString(),tx.txout[i].amount)
                        //1=>
                    }
                }
            }
        }
        return map
    }
    //tempTxInfo[0]=blockIndex,tempTxInfo[1]=txid,tempTxInfo[2]=vout Index=>my unspent address
    createTransaction(sendToAddress,amount,fee=0.00001){
        try{
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
        }catch{
            console.log("tx not found")
        }
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
    createCoinbaseTx(txns,address){
        var totalTxFee=0
        for(var e of txns){
            totalTxFee+=e.fee
        }
        var txOut=new txout(address,totalTxFee+coinbaseReward,address)
        var resultTx=new Transaction(address,totalTxFee+coinbaseReward,['coinbase'],[txOut],0,moment().unix().toString())
        return resultTx
    }
    //blockindex= height
    searchTxWithIndex(txid,blockIndex){
        for(var tx of this.blockchain[parseInt(blockIndex)-1].txns){
            if(txid==tx.txid){
                return(tx)
            }
        }
        return(null)
        //database retrive tx from blcokchain    
    }
     //find block transaction from database



    searchTxInBlock(txid){
        //retreive all block from blockchain in db

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