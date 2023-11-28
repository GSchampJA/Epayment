const { parentPort } = require("worker_threads");

function mining(){
    
    
    parentPort.postMessage(counter);
}
