function doubleHashLoop(){
    const hash=crypto.createHash('sha256')
    for(var i=0;i<arguments.length;i++){
        hash.update(arguments[i])
    }
    result = hash.digest('hex')
    return (result)
}

module.exports= {doubleHashLoop}