const e = require('express');
const superagent = require('superagent');
class p2pNetwork{
    constructor(IPaddress){
        this.connectedPeers=IPaddress
    }
    //action = path; method = post...; data = transaction/block; contenttype = html/json/etc. 
    boardcast(action,method,requestIP,data=null,contentType=null){
        let requestPromise=[]
        this.connectedPeers.forEach(element => {
            if(element!=requestIP){
                requestPromise.push(this.#message(element+action,method,data,contentType))
            }
        });
        Promise.all(requestPromise).then(result=>{
            console.log(result)
        })
    } //async
    async #message(url,method,data,contentType=null){
        if (method.toLowerCase()=='get'){
            try{
                let result=await superagent.get(url)
                //return result
            }catch{
                console.log('Connection Failed')
            }
        }else{
            try{
                let result=await superagent
                                .post(url)
                                .send(data)
                                .set('Content-Type','application/json')
                //return result
            }catch{
                console.log('Connection Failed')
            }
        }
    }
}

module.exports={p2pNetwork}



