const mongoose = require('mongoose');
require('dotenv').config()

const storeWalletPrivateKey = (privateKey) =>{
    mongoose.connect(process.env.DATABASE_URL)
    const db = mongoose.connection

    db.on('error',(error)=> console.error(error))
    db.once('open',()=>console.log('Connect to database'))
    
    const NewWallet = require('../model/walletSchema');
    const newWallet = new NewWallet({
        privateKey: privateKey
    })
    // newBlockchain.save()
    db.collection('wallet').insertOne(newWallet)
    
}

module.exports={storeWalletPrivateKey}