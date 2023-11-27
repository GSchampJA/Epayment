// the transcation pool will be stored memory
// will be using redis database schema
import {Schema, Entity} from 'redis-om';

const transactionSchema = new Schema({
    chainHeight:{
        type: Int16Array,
        required: true
    },
    fullNodeList:{
        list: new Schema({
            address:{
                type: String,
                required: true
            },
        })
    },
    neighborList:{
        list: new Schema({
            address:{
                type: String,
                required: true
            },
        })
    }
})