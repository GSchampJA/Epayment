var mongoose = require('mongoose');
const { Schema } = mongoose;

const blockSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('NewBlock', blockSchema)