const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = '', nonce, difficulty) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = nonce;
        this.difficulty = 3;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce + this.difficulty).toString();
    }

    mineBlock(previousBlocks) {
        const difficulty = adjustDynamicDifficulty(previousBlocks);
      
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
          this.nonce++;
          this.hash = this.calculateHash();
        }
      
        console.log("Block mined: " + this.hash + "\nDifficulty: ");
    }
      
    
    adjustDynamicDifficulty(previousBlocks) {
        const targetBlockTime = 10 * 60;
        const blockCountThreshold = 10;

        const recentBlocks = previousBlocks.slice(-blockCountThreshold);
    
        const totalTimeTaken = recentBlocks.reduce((total, block) => total + block.timeTaken, 0);
    
        const averageTimeTaken = totalTimeTaken / recentBlocks.length;
    
        // Adjust difficulty based on the average time taken
        if (averageTimeTaken > targetBlockTime) {
            return previousBlocks[0].difficulty - 1; // Decrease difficulty
        } else {
            return previousBlocks[0].difficulty + 1; // Increase difficulty
        }
    }
}


class BlockChain {
    constructor() {
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, new Date(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;

        const currentBlock = this.chain[i]
        newBlock.mineBlock();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let blockchain = new BlockChain();
//console.log(JSON.stringify(blockchain, null, 4))
//console.log('Is blockchain valid?' + blockchain.isChainValid())
console.log("Mining block 1...")
blockchain.addBlock(new Block(1, new Date(), { amount:4 }))

console.log("Mining block 2...")
blockchain.addBlock(new Block(2, new Date(), { amount:8 }))

console.log(previousBlocks.slice(-blockCountThreshold));
    