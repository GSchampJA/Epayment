const blockchainSchema = new mongoose.Schema({
    blockIndex:{
        type: Int16Array,
        required: true,
    },
    toAddess:{
        type: String,
        required: true
    },
    blockHeader:{
        type: String,
        required: true
    },
    prevBlock:{
        type: String,
        required: true
    },
    amount:{
        type: Int16Array,
        required: true,

    },
    txinCount:{
        type: Int16Array,
        required: true
    },
    txin:{
        type: Int16Array,
        required: true,
    },
    txoutputCount:{
        type: Int16Array,
        required: true
    },
    txout:{
        type: Int16Array,
        required: true
    },
    fee:{
        type: Int16Array,
        required: true
    }
})
// all info need to be stored