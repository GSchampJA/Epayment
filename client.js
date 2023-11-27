const http=require('http'),
express=require('express'),
block=require('./block'),
blockchain=require('./blockchain')
network=require('./network');
const wallet = require('./wallet');
require('dotenv').config()
const mongoose = require('mongoose')

app=express()
const blockchainObj=new blockchain.BlockChain()
// connection to the database
// need to download mongodb into local storage
// paste the local mongodb link to .env file to connect do the connection of mongodb
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

// server can accept json
// app.use(express.json)

db.on('error',(error)=> console.error(error))
db.once('open',()=>console.log('Connect to database'))


//Sync with netwrok every time booted with network class

app.get("/", function (req, res) {
    //1. Transaction
    //2. Address
    //3. Block's info
    
});

// create wallet - user account 
//          --> return (private key: string) to f/e ; b/e keeps the username, private key and public keys(address)
app.post('/wallet/Create',function(req,res){
    
    //calling wallet from wallet.js
      // Creating a new wallet instance
    const walletInstance = new wallet();
    
    // Calling the createNewAddress function to generate a new address
    walletInstance.createNewAddress();
    
    // Retrieving the newly created address from the wallet instance
    const walletAddress = walletInstance.walletAddress;
    // walletname = newwallet.wallet[0].walletname
    // walletaddr = wallet.wallet(walletname)

    res.send('Wallet address: ' + JSON.stringify(walletAddress));
})

app.get("/wallet/WalletInfo", function (req, res) {
    //provide wallet information

});

app.get("/utxo", function (req, res) {
    //unspent transaction
    res.send(storage.UTXO()) //should be sending the total UTXO or the address's UTXO?
});

//for testing only
//create keypairs first
app.get('/CreateNewBlock',function(req,res){
    const {wallet}=require('./wallet');
    const {Block,BlockHeader,txin,txout,Transaction}=require('./block');
    wallet.importPrivateKey("308184020100301006072a8648ce3d020106052b8104000a046d306b020101042047eba4323fe49eb1e4ff406207f484bd56b00af180da380d4cfe2c7ae8550dfda14403420004afbe7934ab7ce1c7ebf01b56c675a05a86a5d0eb4764b0414eabb118ccee990d16003eb55e095a3ec631181ced898aba2162ab8a2a79e2d08b11ebf7bfc6525c");
    var blockchain=require('./blockchain')
    obj=new blockchain.BlockChain();
    debugger;
    var coinBaseTx=obj.createCoinbaseTx([],'1khUJ4r2r1Wf6D7ZmRpZGSKA1E6dXnf');
    coinBaseTx.isTransactionValid()
    var blockheaderObj= new BlockHeader('1',null,'1701107223');
    var blockObj=new Block(2,blockheaderObj,[coinBaseTx]);
    obj.blockchain.push(blockObj);

})

var server = app.listen(8333,function(){
    var host = server.address().address
    var port = server.address().port
    console.log(`Host: ${host} Port: ${port}`)
})

