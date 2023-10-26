    const http=require('http'),
    express=require('express'),
    block=require('./block'),
    blockchain=require('./blockchain')
    network=require('./network');
    app=express()

    app.get('/wallet',function(req,res){
        res.send('Hello World')
    })

    //for testing only
    app.get('/createNewBlock',function(req,res){
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

