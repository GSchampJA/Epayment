const { generateKeyPair,createECDH,createHash, generateKeyPairSync, createSign } = require('node:crypto');
const { base58, base64, } = require('@scure/base');
const fs = require('fs');
const { Block,Transaction } = require('./block');
const { doubleHashLoop, publicKeyHashfunc, }= require('./utility/hashUtility')


// One wallet allows multiple address, but only one private key
class wallet {
  static walletAddress=new Map()
    // constructor(){
    //     const EC = require('elliptic').ec;
    //     const ec = new EC('secp256k1');
    //     const myKey = ec.keyFromPrivate(myPrivateKey);
        
    // }
    constructor(){
        //this.walletAddress.push(this.createNewAddress())
    }
    
    static createNewAddress(){
          const {
            publicKey,
            privateKey,
          } = generateKeyPairSync('ec', {
            namedCurve: 'secp256k1',
            publicKeyEncoding: {
              type: 'spki',
              format: 'der',
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'der',
            },
          });
          // console.log(publicKey.toString('hex'))
          console.log(publicKeyHashfunc(publicKey.subarray(-64,-32))) 
          // console.log(publicKey.subarray(-64,-32).toString('hex'))     //getting x
          // console.log(publicKey.subarray(-32).toString('hex'))         //getting y
          console.log((privateKey.toString('hex')))
          var publicKeyHash=publicKeyHashfunc(publicKey)
          if(!(this.walletAddress.has(publicKeyHash))){
            this.walletAddress.set(publicKeyHash,[privateKey.toString('hex'),publicKey.toString('hex')])
          }else{
            console.log("Key is imported already.")
          }
    }
    //generating public key from private key
    static importPrivateKey(privateKey){
      privateKey=Buffer.from(privateKey,'hex')
        var tempKey=crypto.createPublicKey({
            key: privateKey,
            format: 'der',
            type:'pkcs8'
            })

          var tempPublicKey=tempKey.export({
            format: 'der',
            type: 'spki',
          })
          var publicKeyHash=publicKeyHashfunc(tempPublicKey)
          if(!(this.walletAddress.has(publicKeyHash))){
            this.walletAddress.set(publicKeyHash,[privateKey.toString('hex'),tempPublicKey.toString('hex')])
          }else{
            console.log("Key is imported already.")
          }
          return(tempPublicKey)
    }
      //txin=unlockScript=> signature, lockSript= txin.utxo.txout.lockScript=>public key hash
    static signTransaction(txin,lockScript,txid){
        try{
        var privateKey=Buffer.from(this.walletAddress.get(lockScript)[0],'hex')
        var publicKey=this.walletAddress.get(lockScript)[1]
        const sign= createSign('SHA256')
        sign.update(Buffer.from(txid,'hex'))
        sign.end();
        var tempPrivate=crypto.createPrivateKey({
          key:privateKey,
          format:'der',
          type: 'pkcs8'
        })
        var privateKeyPem=tempPrivate.export({
          format:'pem',
          type:'pkcs8'
        })
        console.log(privateKeyPem.toString())
        const signature = sign.sign(privateKeyPem);
        console.log(signature)
        txin.unlockScript=[signature.toString('hex'),publicKey]
        return(txin)
      }catch(e){
        console.log('No key imported')
      }
    }
  

    static getAllAddress(){
      //the private key can be stored in db
      // therefore, retrieving account from db
      return(["MIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQg0sXtqil/SmSsq+XvcK6m0Np6SURmOxFVX570pKMJ1LGhRANCAAR6CGniaGteJEf9IQvScLejZrbvwYBTCFA+/XUpHNF4kK87ngtr1On3FZ5dardJuJ0H2e+Vgl83ckLmYUBuq3X5","MIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQglXpxJbCNdmCx1B76n/8t4vuYDcNkls8coEmBOfMzp+ShRANCAATuzVKGPrCfPz9v7MhzlD14V388SaAFxa+leU+qCxBxmFW1xaAQEUoDj9ICNVDdE5Z5SFSX30LAX5And8KLMGXQ"])
    }


    //sendToAddress => public key hash
}

module.exports = {wallet}

