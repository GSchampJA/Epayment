const block=require('./block'),
    moment=require('moment');
class BlockChain{
    constructor(){
        this.length=1
        this.blockchain=[this.#getGenesisBlock()]
    }
    #getGenesisBlock(){
        let blockHeader=new block.BlockHeader(1,null,"0x1bc3300000000000000000000000000000000000000000000",moment().unix(),null,null)
        return block.Block(1,blockHeader,null)
    }

}

module.exports={BlockChain}