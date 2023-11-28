const walletSchema = new mongoose.Schema({
    id:{
        type: Int16Array,
        required: true
    },
    privateKey:{
        // identify the address
        // when user boot computer, then will import private key from here
        type: String,
        required: true
    }
})