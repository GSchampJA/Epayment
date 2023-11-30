var mongoose = require('mongoose');
const { Schema } = mongoose;

const blockHeader = new mongoose.Schema({
    version: { type: Number} ,
    previousBlockHeader: { type: String } ,
    merkleRoot: { type: String },
    timeStamp: { type: Number },
    difficulty: { type:Number},
    nonce: { type: Number},
})

const blockchainSchema = new mongoose.Schema({
    blockIndex: String,
    blockHeader:[blockHeader],
    prevBlock: String,
    amount: Number,
    txinCount: Number, 
    txin: Array,
    txoutputCount:Number,
    txout: Array,
    fee: Number, 
})
// all info need to be stored

module.exports = mongoose.model('NewBlockchain', blockchainSchema)