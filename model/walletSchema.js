var mongoose = require('mongoose');
const { Schema } = mongoose;
const walletSchema = new mongoose.Schema({
    id:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    privateKey:{
        // identify the address
        // when user boot computer, then will import private key from here
        type: String,
        required: true
    }
})

module.exports = mongoose.model('walletSchema', walletSchema)