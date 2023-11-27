const blockchainSchema = new mongoose.Schema({
    blockIndex:{
        type: Int16Array,
        required: true
    },
    address:{
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
    }
})