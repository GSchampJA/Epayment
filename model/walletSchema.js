const walletSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    walletbalance:{
        type: Int16Array,
        required: true
    },
    txid:{
        type: Int16Array,
        required: true
    },
    toAddress:{
        type: String,
        required: true
    },
    amount:{
        type: Int16Array,
        required: true
    },
    txin:{
        type: String,
        required: true
    },
    txout:{
        type: String,
        required: true
    },
    privateKey:{
        type: String,
        required: true
    }
})
