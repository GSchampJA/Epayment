const { generateKeyPair,createECDH,createHash, generateKeyPairSync, createSign } = require('node:crypto');
const { base58, base64, } = require('@scure/base');
const fs = require('fs');
const { stringify } = require('node:querystring');


// One wallet allows multiple address, but only one private key
class wallet {
    // constructor(){
    //     const EC = require('elliptic').ec;
    //     const ec = new EC('secp256k1');
    //     const myKey = ec.keyFromPrivate(myPrivateKey);
        
    // }
    constructor(){
        this.walletAddress=new Map()
        //this.walletAddress.push(this.createNewAddress())
    }
    publicKeyHash(publicKey) {
        var hash256=createHash('sha256')
        hash256.update(publicKey)
        var hashripemd = createHash('ripemd160')
        var result='00'+hashripemd.update(hash256.digest()).digest('hex')
        const hash=crypto.createHash('sha256')
        var postfix=hash.copy().update(result).digest()
        hash.update(postfix)
        result += hash.digest('hex').substr(0,4)
        result = Buffer.from(result.toString('hex'),'hex');
        return (base58.encode(result))
    }
    createNewAddress(){
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
          console.log(publicKey.toString('hex'))
          console.log(this.publicKeyHash(publicKey))
          console.log((privateKey.toString('hex')))
          var publicKeyHash=this.publicKeyHash(publicKey)
          if(!(this.walletAddress.has(publicKeyHash))){
            this.walletAddress.set(publicKeyHash,[privateKey.toString('hex'),publicKey.toString('hex')])
          }else{
            console.log("Key is imported already.")
          }
    }
    //generating public key from private key
    importPrivateKey(privateKey){
        var tempKey=crypto.createPublicKey({
            key: privateKey,
            format: 'der',
            type:'pkcs8'
            })

          var tempPiblicKey=tempKey.export({
            format: 'der',
            type: 'spki',
          })
          publicKeyHash=this.publicKeyHash(tempPiblicKey)
          if(!(this.walletAddress.has(publicKeyHash))){
            this.walletAddress.set(publicKeyHash,[privateKey.toString('hex'),tempPiblicKey.toString('hex')])
          }else{
            console.log("Key is imported already.")
          }
          return(tempPiblicKey)
    }
      //txin=unlockScript=> signature, lockSript= txin.utxo.txout.lockScript=>public key hash
    signTransaction(txin,lockScript){
        var privateKey=Buffer.from(this.walletAddress.get(lockScript)[0],'hex')
        var publicKey=this.walletAddress.get(lockScript)[1]
        const sign= createSign('SHA256')
        sign.update(Buffer.from(lockScript,'hex'))
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
        txin.unlockScript=JSON.stringify([signature.toString('hex'),publicKey])
        return(txin)
    }
  

    getAllAddress(){
      //the private key can be stored in db
      // therefore, retrieving account from db
      return(["MIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQg0sXtqil/SmSsq+XvcK6m0Np6SURmOxFVX570pKMJ1LGhRANCAAR6CGniaGteJEf9IQvScLejZrbvwYBTCFA+/XUpHNF4kK87ngtr1On3FZ5dardJuJ0H2e+Vgl83ckLmYUBuq3X5","MIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQglXpxJbCNdmCx1B76n/8t4vuYDcNkls8coEmBOfMzp+ShRANCAATuzVKGPrCfPz9v7MhzlD14V388SaAFxa+leU+qCxBxmFW1xaAQEUoDj9ICNVDdE5Z5SFSX30LAX5And8KLMGXQ"])
    }

  

    listUnspent(){
      
    }
}

module.exports = {wallet}

