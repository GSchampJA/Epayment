const { workerData,parentPort } = require("worker_threads");
const blockchain=require('./blockchain')
const { doubleHashLoop}= require('./utility/hashUtility')
    var target=workerData.block.blockHeader.difficulty
    var index=workerData.block.blockIndex
    let hash = doubleHashLoop(workerData.block.blockHeader)
    while (hash.slice(0, target) != '0'.repeat(target)) {
        if(workerData.length==index){
            throw new Error(console.error('Mining Interrupted'))
        }
        if(workerData.stopFlag==true){
            throw new Error(console.error('Mining stopped'))
        }
        workerData.block.blockHeader.nonce+=1
        hash = doubleHashLoop(workerData.block.blockHeader)
    }
    workerData.block.currentBlockHash=hash
    parentPort.postMessage(workerData.block);
