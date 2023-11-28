const {Block,BlockHeader,txin,txout,Transaction}=require('./block');
const moment=require('moment');
const storage=require('storage');
const minTxns=require("./utility/algorithm")
const {wallet}=require('./wallet');
const { time } = require('console');

class BlockChain{
    constructor(){
        this.length=1 
        this.blockchain=[this.#getGenesisBlock()]
    }
    #getGenesisBlock(){
        let blockHeader=new BlockHeader(1,null,"0x1bc3300000000000000000000000000000000000000000000",moment().unix(),null,null)

        return Block(1,blockHeader,null)
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
        map=null
        for (var block in this.blockchain) {
            for(var tx in block.txns){
                for(var txin in tx.txin){
                    if (txin.fromAddress in addresses){
                        map.delete(txin.utxo+txin.index.toString())
                    }
                }
                for(var i =0; 1<tx.txoutputCount;i++){
                    if (tx.txout[i].toAddress in addresses){
                        map.set(block.blockIndex.toString()+':'+tx.txid+':'+i.toString(),tx.txout[i].amount)
                    }
                }
            }
        }

        return map
    }
    //tempTxInfo[0]=blockIndex,tempTxInfo[1]=txid,tempTxInfo[2]=vout Index=>my unspent address
    createTransaction(addresses,sendToAddress,amount,fee=0.00001){
        var resultTxOut=[]  
        var resultTxIn=[]
        var balance=0
        var resultTx //resulted tx
        var utxo=this.scanUnspentTx(addresses)
        var txid
        var inputAddress=[]  //all wallet addresses used in txin
        utxo=minTxns(utxo,amount+fee)
        if(utxo==false)return 0
        for (address in utxo){
            balance+=address[1]
            var tempTxInfo=address[0].split(':')
            var tempTx=this.searchTxWithIndex(tempTxInfo[1],tempTxInfo[0])
            inputAddress.push(tempTx.txout[tempTxInfo[2]].toAddress)
            var tempTxin=new txin(tempTx.txout[tempTxInfo[2]].toAddress,tempTxInfo[1],tempTxInfo[2],null)
            tempTxin=wallet.signTransaction(tempTxin,sendToAddress,tempTxInfo[1])
            resultTxIn.push(tempTxin)
        }
        var timeNow=moment().unix().toString()
        if(balance==amount+fee){
            var txoutObj=new txout(sendToAddress,amount,sendToAddress)
            resultTxOut.push(txoutObj)
            txid=doubleHashLoop(...inputAddress,sendToAddress,amount,timeNow)
            resultTx=new Transaction(txid,sendToAddress,amount,resultTxIn,resultTxOut,fee,timeNow)
        }else{
            var change=new txout(inputAddress[0],balance-amount,inputAddress[0])
            resultTxOut.push(txoutObj)
            var txoutObj=new txout(sendToAddress,amount,sendToAddress)
            resultTxOut.push(txoutObj)
            var txid=doubleHashLoop(...inputAddress,sendToAddress,inputAddress[0],amount,timeNow)
            resultTx=new Transaction(txid,sendToAddress,amount,resultTxIn,resultTxOut,fee,timeNow)
        }
        return resultTx
    }

    searchTxWithIndex(txid,blockIndex){
        for(var tx in this.BlockChain[blockIndex].txns){
            if(txid==tx.txid){
                return(tx)
            }
        }
        return(null)
    }

    //find block transaction from database
    searchTxInBlock(txid){
        for (var block in this.blockchain) {
            for(var tx in block.txns){
                if(txid==tx.txid){
                    return(tx)
                }
            }
        }
        return(null)
    }

}

module.exports={BlockChain}