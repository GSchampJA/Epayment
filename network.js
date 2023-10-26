const superagent = require('superagent');
class p2pNetwork{
    constructor(IPaddress){
        this.connectedPeers=IPaddress
    }
    boardcast(action,method,data=null,contentType=null){
        let requestPromise=[]
        this.connectedPeers.forEach(element => {
            requestPromise.push(this.#message(element+action,method,data,contentType))
        });
        Promise.all(requestPromise).then(result=>{
            console.log(result)
        })
    }
    async #message(url,method,data,contentType){
        if (method.toLowerCase()=='get'){
            try{
                let result=await superagent.get(url)
            }catch{
                console.log('Connection Failed')
            }
        }else{
            try{
                let result=await superagent
                                .post(url)
                                .send(data)
                                .set('Content-Type','application/json')
            }catch{
                console.log('Connection Failed')
            }
        }
    }
}

module.exports={p2pNetwork}



