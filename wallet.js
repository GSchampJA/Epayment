crypto=require('crypto')

class wallet {
    constructor(){
        const EC = require('elliptic').ec;
        const ec = new EC('secp256k1');
       

        const myKey = ec.keyFromPrivate(myPrivateKey);
    }
}