const { generateKeyPair,createECDH,createHash, generateKeyPairSync, } = require('node:crypto');
const { base58, base64, } = require('@scure/base');
const fs = require('fs')

class wallet {
    // constructor(){
    //     const EC = require('elliptic').ec;
    //     const ec = new EC('secp256k1');
    //     const myKey = ec.keyFromPrivate(myPrivateKey);
        
    // }
    constructor(){
        this.createNewAddress()
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
          console.log(privateKey)

    }
    //importing private key with der format
    importPrivateKey(privatekey){
        var tempKey=crypto.createPublicKey({
            key: privateKey,
            format: 'der',
            type:'pkcs8'
            })

          var tempPiblicKey=tempKey.export({
            format: 'der',
            type: 'spki'
          })
          console.log(tempPiblicKey)
          console.log(this.publicKeyHash(tempPiblicKey))
    }
}

module.exports = {wallet}