const {Block,BlockHeader,txin,txout}=require('./block');
const moment=require('moment');
const storage=require('storage');
const minTxns=require("./utility/algorithm")

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

    createTransaction(addresses,sendToAddress,amount,fee=0.00001){
        var utxo=this.scanUnspentTx(addresses)
        utxo=minTxns(utxo)
        doubleHashLoop(sendToAddress,amount,moment().unix().toString())
        for (address in utxo){
            var tempTxin=new txin()
        }
        tx=new Transaction(txid,sendToAddress,amount)

    }


    searchTx(txid){
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