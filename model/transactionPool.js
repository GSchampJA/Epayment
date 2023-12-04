// the transcation pool will be stored memory
// will be using redis database schema
import {Schema, Entity} from 'redis-om';
const blockchain = require('../blockchain');

class blockchainMem extends Entity{}

const transactionSchema = new Schema(blockchainMem, {
    chainHeight:{type: 'string'},
    fullNodeList:{
        // full blockchain
        blockIndex: {type: 'string'},
        blockHeader:{
            version:  {type: 'string'} ,
            previousBlockHeader:  {type: 'set'}  ,
            merkleRoot:  {type: 'set'},
            timeStamp:  {type: 'string'} ,
            difficulty:  {type: 'string'},
            nonce:   {type: 'string'}
        },
        txns:  {type: 'list'},
        currentBlockHash:  {type: 'string'}
    },
    neighborList:{
        // the forking blockchain
        blockIndex:  {type: 'string'},
        blockHeader:{
            version:  {type: 'string'} ,
            previousBlockHeader: {type: 'set'}  ,
            merkleRoot: {type: 'set'},
            timeStamp:  {type: 'string'} ,
            difficulty:  {type: 'string'},
            nonce:  {type: 'string'}
        },
        txns: {type: 'list'},
        currentBlockHash: {type: 'string'}
    }
})

export async function create(blockchain){
    const repo = client.fetchRepository(transactionSchem);
    const blockchainMem = repo.createEntity(blockchain);

    await repo.save(blockchainMem)
    return blockchainMem.toJSON();
}

export async function getMem(blockIndex){
    const repo = client.fetchRepository(transactionSchem);
    const blockchainMem = await repo.fetch(blockIndex);

    return blockchainMem.toJSON();
}