const { base58, base64, } = require('@scure/base');
const { generateKeyPair,createECDH,createHash, generateKeyPairSync, createSign } = require('crypto');

function doubleHashLoop(){
    const hash=createHash('sha256')
    var tmepHash = hash.copy()
    for(var i=0;i<arguments.length;i++){
        hash.update(Buffer.from(JSON.stringify(arguments[i])))
    }
    tmepHash.update(hash.digest())
    result = tmepHash.digest('hex')
    return (result)
}

function publicKeyHashfunc(publicKey) {
    var hash256=createHash('sha256')
    hash256.update(publicKey)
    var hashripemd = createHash('ripemd160')
    var result='00'+hashripemd.update(hash256.digest()).digest('hex')
    const hash=createHash('sha256')
    var postfix=hash.copy().update(result).digest()
    hash.update(postfix)
    result += hash.digest('hex').substr(0,4)
    result = Buffer.from(result.toString('hex'),'hex');
    return (base58.encode(result))
}



module.exports= {doubleHashLoop,publicKeyHashfunc}
