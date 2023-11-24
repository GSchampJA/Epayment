crypto=require('crypto')

class wallet {
    constructor(){
        crypto.generateKeyPair('rsa', { 
            modulusLength: 530,    // options 
            publicExponent: 0x10101, 
            publicKeyEncoding: { 
              type: 'pkcs1', 
              format: 'der'
            }, 
            privateKeyEncoding: { 
              type: 'pkcs8', 
              format: 'der', 
              cipher: 'aes-192-cbc', 
              passphrase: 'GeeksforGeeks is a CS-Portal!'
            } 
          }, (err, publicKey, privateKey) => {  
                 if(!err) { 
                   // Prints new asymmetric key pair 
                   this.publickey=publicKey
                   this.privateKey=privateKey 
                } 
            });  
    }
}

awallet = new wallet();
console.log(awallet)