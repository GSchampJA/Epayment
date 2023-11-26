const http=require('http'),
express=require('express'),
block=require('./block'),
blockchain=require('./blockchain')
network=require('./network');
wallet=require('./wallet');
require('dotenv').config()
const mongoose = require('mongoose')
app=express()

// connection to the database
// need to download mongodb into local storage
// paste the local mongodb link to .env file to connect do the connection of mongodb
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

// server can accept json
app.use(express.json)

db.on('error',(error)=> console.error(error))
db.once('open',()=>console.log('Connect to database'))


//Sync with netwrok every time booted with network class

router.get("/", function (req, res) {
    //1. Transaction
    //2. Address
    //3. Block's info
    
});

app.post('/wallet/Create',function(req,res){
    newwallet = req.body;

    //calling wallet from wallet.js
    walletname = newwallet.wallet[0].walletname
    walletaddr = wallet.wallet(walletname)

    res.send('Wallet address: ' + JSON.stringify(walletaddr));
})

router.get("/wallet/WalletInfo", function (req, res) {
    //provide wallet information

});

router.get("/utxo", function (req, res) {
    //unspent transaction
    res.send(storage.UTXO()) //should be sending the total UTXO or the address's UTXO?
});

//for testing only
app.get('/CreateNewBlock',function(req,res){
    newheader=new block.BlockHeader('1.71','0','0',0,0,0)
    newTxn=new block.Transaction('0','0','script')
    newBlock=new block.Block(0,newheader,[newTxn,newTxn,newTxn,newTxn,newTxn,newTxn,newTxn,newTxn])
    console.log(newBlock)
    p2p=new network.p2pNetwork(['172.25.218.149:8333',])
    p2p.boardcast('/createNewBlock','get')
    res.send('new block added')
})

var server = app.listen(8333,function(){
    var host = server.address().address
    var port = server.address().port
    console.log(`Host: ${host} Port: ${port}`)
})

