const mongoose = require('mongoose');

const storeBlockToDB = (blockObj) => {
    mongoose.connect(process.env.DATABASE_URL)
    const db = mongoose.connection

    db.on('error',(error)=> console.error(error))
    db.once('open',()=>console.log('Connect to database'))
    console.log(blockObj)
    
    const NewBlock = require('../model/blockSchema');
    const newBlock = new NewBlock({
        blockIndex: blockObj.blockIndex,
        blockHeader: blockObj.blockHeader,
        txns: blockObj.txns,
        currentBlockHash: blockObj.currentBlockHash
    })

    db.collection('block').insertOne(newBlock)

}

module.exports={storeBlockToDB}