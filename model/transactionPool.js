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
        blockIndex: Number,
        blockHeader:{
            version: Number ,
            previousBlockHeader: String  ,
            merkleRoot: String,
            timeStamp: Number ,
            difficulty: Number,
            nonce:  Number
        },
        txns: Array,
        currentBlockHash: String
    },
    neighborList:{
        // the forking blockchain
        blockIndex: Number,
        blockHeader:{
            version: Number ,
            previousBlockHeader: String  ,
            merkleRoot: String,
            timeStamp: Number ,
            difficulty: Number,
            nonce:  Number
        },
        txns: Array,
        currentBlockHash: String
    }
})

module.exports={transactionSchema}
