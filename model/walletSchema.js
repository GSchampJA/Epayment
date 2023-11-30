var mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new mongoose.Schema({
    privateKey: String
})

module.exports = mongoose.model('walletSchema', walletSchema)