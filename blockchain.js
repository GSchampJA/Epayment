const block=require('./block'),
moment=require('moment');
storage=require('storage');

class BlockChain{
    constructor(){
        this.length=1 
        this.blockchain=[this.#getGenesisBlock()]
    }
    #getGenesisBlock(){
        let blockHeader=new block.BlockHeader(1,null,"0x1bc3300000000000000000000000000000000000000000000",moment().unix(),null,null)

        return block.Block(1,blockHeader,null)
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
    scanAllBlcok(address){
        for (let i = 1; i < this.blockchain.length; i++) {
            
            
            
        }

        return true;
    }
    searchTx(){

    }

}

module.exports={BlockChain}