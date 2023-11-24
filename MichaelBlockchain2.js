const SHA256 = require('crypto-js').SHA256

class Block{
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.difficulty = 4;
    }

    calculateHash() { 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce + this.difficulty).toString();
    }

    mineBlock(lastBlock) {
        while (this.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join("0")) {
            let timestamp = Date.now();
			this.difficulty = this.adjustDifficulty(lastBlock, timestamp);

            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

    adjustDifficulty(lastBlock, newBlockTime) {

        let difficulty = lastBlock.difficulty;

		difficulty = lastBlock.timestamp + 3000 > newBlockTime ? ++difficulty  : --difficulty; //Leave for TA 

		if(difficulty < 1) difficulty = 1;

		return difficulty;
	}
}


class BlockChain {
    constructor() {
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(new Date(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.getLatestBlock());
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
//console.log('Is blockchain valid?' + blockchain.isChainValid())
console.log("Mining block 1...")
blockchain.addBlock(new Block(new Date(), { amount:4 }))

console.log("Mining block 2...")
blockchain.addBlock(new Block(new Date(), { amount:8 }))

console.log("Mining block 3...")
blockchain.addBlock(new Block(new Date(), { amount:8 }))

console.log("Mining block 4...")
blockchain.addBlock(new Block(new Date(), { amount:8 }))

console.log("Mining block 5...")
blockchain.addBlock(new Block(new Date(), { amount:8 }))

console.log("Mining block 6...")
blockchain.addBlock(new Block(new Date(), { amount:8 }))


console.log(JSON.stringify(blockchain, null, 4))