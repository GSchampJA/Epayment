const mongoose = require('mongoose');

const storeBlockToDB = (blockObj) => {
    mongoose.connect(process.env.DATABASE_URL)
    const db = mongoose.connection

    db.on('error',(error)=> console.error(error))
    db.once('open',()=>console.log('Connect to database'))
    let temp = 
    // var coinBaseTx=blockchainObj.createCoinbaseTx([],'1qwFqhokiTASXVSTqQyNAuit6qfbMpx');
    console.log(blockObj)
    
    const NewBlock = require('../model/blockSchema');
    const newBlock = new NewBlock({
        blockIndex: blockObj.blockIndex,
        blockHeader: blockObj.blockHeader,
        txns: blockObj.txns,
        currentBlockHash: blockObj.currentBlockHash
    })

    // console.log("The new blockchain: \n" + newBlockchain)

    // store the blockchain into db
    // res.send(JSON.stringify(createNewBlockchain));

    db.collection('block').insertOne(newBlock)


}

module.exports={storeBlockToDB}