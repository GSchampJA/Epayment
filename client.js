const http=require('http'),
express=require('express'),
block=require('./block'),
blockchain=require('./blockchain')
network=require('./network');
const wallet = require('./wallet');
require('dotenv').config()
const mongoose = require('mongoose');
const { p2pNetwork } = require('./network');
const { post } = require('superagent');
const moment=require('moment');
const { Worker} = require("worker_threads");
const cors = require('cors');

app=express()
function getMiningAddress(){
    if(wallet.wallet.walletAddress.size!==0){
        return([...wallet.wallet.walletAddress.keys()][0])
    }
    else{
        return false
    }
}

app.use(cors());
const blockchainObj=new blockchain.BlockChain()
//give an array of addresses
const networkObj=new p2pNetwork()
// connection to the database
// need to download mongodb into local storage
// paste the local mongodb link to .env file to connect do the connection of mongodb

// mongoose.connect(process.env.DATABASE_URL)
// const db = mongoose.connection

// server can accept json
// app.use(express.json)

// db.on('error',(error)=> console.error(error))
// db.once('open',()=>console.log('Connect to database'))

app.use(express.json())
//Sync with netwrok every time booted with network class

app.get("/", function (req, res) {
    //1. Transaction
    //2. Address
    //3. Block's info
    
});

app.get("/getBlockBlockchain/:blockIndex",(req, res)=>{
    // open db
    // get blockchain based on id
    // return block info
})

app.post("/getMyaddressUTx",(req, res)=>{
    try {
        const map = blockchainObj.scanUnspentTx(new Map([[req.body.address,'1']]))
        return res.json({map})
    } catch {
        return res.status(500).json({ error: 'Unexpected Error' });
    }
})

//get request from req of address,amount and fee
app.post('/createTx',function(req,res){
    var newTx=blockchainObj.createTransaction(req.body.address,req.body.amount,req.body.fee=0.00001)

    networkObj.boardcast('/verifyTx','post',JSON.stringify(newTx),'JSON')
    res.json(newTx)
})

app.post('/verifyTx',function(req,res){
    var newTx= req.body
    if(newTx.txin[0]=='coinbase'){
        res.send("rejected")
    }
    if(blockchainObj.isTransactionValid(newTx)){
        blockchainObj.txPool.add(newTx)
    }
})

// create address - 
//          --> return (private key: string) to f/e ; b/e keeps private key and public keys(address)
app.post('/wallet/Create',function(req,res){
    const {wallet}=require('./wallet');

    var publicKeyHash,privateKey
    [publicKeyHash,privateKey]= wallet.createNewAddress()

    return res.json({ publicKeyHash, privateKey });
})

// create address - input:  privateKey
//          --> return (private key: string) to f/e ; b/e keeps the username, private key and public keys(address)
app.post('/wallet/valid_existing',function(req,res){
    const {wallet}=require('./wallet');
    const address = req.body.address; // publicKeyHash
    const prK = req.body.privateKey

    try {
        if (!wallet.checkExistingAddress(prK)) {
            return res.status(500).json({ error: 'Address is not exist' });
        }
    
        if (!wallet.checkValidKeypair(address, prK)) {
            return res.status(500).json({ error: 'Unmatch address and privateKey' });
        }
    
        res.json({login: true})
    } catch {
        return res.status(500).json({ error: 'Wrong Address or private key' });
    }

    
})


app.get("/stopMining",(req,res)=>{
    if(req.body.isMining==false){
        networkObj.miningRequest(getMiningAddress)
    }
    if(blockchain.BlockChain.stopMining==true){
        blockchain.BlockChain.stopMining=false
    }
    if(blockchain.BlockChain.stopMining==false){
        blockchain.BlockChain.stopMining=true
    }
    res.send('Mining Stopped or start')
    //stop mining proccess, true => stop mining ,false => mine
})  

app.post("/verifyBlock",(req,res)=>{
    var block=req.body.block
    if (blockchainObj.isBlockValid(block)){
        blockchain.BlockChain.length++
        networkObj.boardcast("/verifyBlock",'post',req.ip,{"block":req.body.block})
        for(tx of block.txns){
            blockchainObj.txPool.removeElement(tx)
        }
        networkObj.miningRequest()
    }

})

app.get("/mining",async (req,res)=>{
    if(blockchainObj.txPool.size_of_list()!=0){
    var txns=blockchainObj.txPool.toArray()
    }else var txns=[]
    var newBlockHeader=new block.BlockHeader(blockchainObj.getLatestBlock().currentBlockHash,moment().unix().toString())
    var coinbaseTx=blockchainObj.createCoinbaseTx(txns,'1qwFqhokiTASXVSTqQyNAuit6qfbMpx')
    var newBlock=new block.Block(blockchain.BlockChain.length+1,newBlockHeader,[coinbaseTx,...txns])
    const worker = new Worker("./mining.js", {
        workerData: { block: newBlock },
    });
    worker.on("message", (data) => {
        if(data!=false ){
            if(txns.length!=0){
                for(tx of txns){
                    blockchainObj.txPool.removeElement(tx)
                }
            }
            blockchain.BlockChain.length++
            console.log(data)
            console.log(blockchain.BlockChain.length)
            blockchainObj.blockchain.push(data)
            //database save data 

            //psuh to blockchain 
            //save this mined block to database
            //networkObj.miningRequest(getMiningAddress())
            networkObj.miningRequest()
        }else{
            console.log("Block Mined by others")
        }
    });
    worker.on("error", (msg) => {
        console.log(`An error ocurred: ${msg}`);
        res.send("Mining stopped")
    });
    //newBlock= await createWorker(newBlock)
})

app.get("/wallet/unspentTx", function (req, res) {
    //provide wallet information
    var map=new Map()
    map=blockchainObj.scanUnspentTx(wallet.wallet.walletAddress)
    res.json(map)
});

app.get("/utxo", function (req, res) {
    //unspent transaction
    res.send(storage.UTXO()) //should be sending the total UTXO or the address's UTXO?
});

//for testing only
//create keypairs first
app.get('/testing',function(req,res){
    const {wallet}=require('./wallet');
    const {Block,BlockHeader,txin,txout,Transaction}=require('./block');
    wallet.importPrivateKey("308184020100301006072a8648ce3d020106052b8104000a046d306b020101042047eba4323fe49eb1e4ff406207f484bd56b00af180da380d4cfe2c7ae8550dfda14403420004afbe7934ab7ce1c7ebf01b56c675a05a86a5d0eb4764b0414eabb118ccee990d16003eb55e095a3ec631181ced898aba2162ab8a2a79e2d08b11ebf7bfc6525c");
    wallet.importPrivateKey("308184020100301006072a8648ce3d020106052b8104000a046d306b020101042048c7d7391eb2809703fc3c1e7b3a4e1dc92a130bfbc6182e0849cd19b8d783c3a14403420004fc977c70de2066e2d8e27ac1e5a61d2194059a3bbc5c66bda637227c29b3fe39b80696965e0dbcf1d1ba073cda002e7f5384bba083fb060210cc7b0507ac519f");
    // console.log(wallet.walletAddress)
    var blockchain=require('./blockchain')
    obj=new blockchain.BlockChain();
    var coinBaseTx=obj.createCoinbaseTx([],'1qwFqhokiTASXVSTqQyNAuit6qfbMpx');
    console.log(coinBaseTx) //check if create tx input address is the same as the coinbase one
    if(obj.isTransactionValid(coinBaseTx)){
        var blockheaderObj= new BlockHeader('1',null,'1701107223');
        var blockObj=new Block(2,blockheaderObj,[coinBaseTx]);
        obj.blockchain.push(blockObj);
        debugger
        // console.log(obj)
        var unspentedTx=obj.scanUnspentTx(new Map([['1qwFqhokiTASXVSTqQyNAuit6qfbMpx','1']]))
        var addressToSearch=[...unspentedTx.keys()][0].split(':')[1]
        var searchedTx=obj.searchTxWithIndex(addressToSearch,2)
        // console.log("searchedTx : ")
        // console.log(searchedTx)
        var newTx=obj.createTransaction("1UK87hKPfkepZNgjE8bLaqrUj2o8dG5",0.000005,fee=0.000005)
        console.log(obj.isTransactionValid(newTx))
        console.log(newTx)
        res.send('test successfully')
    }

})

var server = app.listen(8333,function(){
    var host = server.address().address
    var port = server.address().port
    console.log(`Host: ${host} Port: ${port}`)
})

