// the transcation pool will be stored memory
// will be using redis database schema
import {Schema, Entity} from 'redis-om';

class User extends Entity{

}

const transactionSchema = new Schema(User, {
    chainHeight:{
        type: Int16Array,
    },
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

module.exports={transactionSchema}
