crypto=require('crypto')

class Transaction{
    constructor(hash,index,script,number=0xFFFFFFFF){
        this.hash=hash
        this.index=index
        this.script=script
        this.number=number
    }
}

class BlockHeader{
    constructor(version,previousBlockHeader,merkleRoot,timeStamp,target,nonce){
        this.version=version
        this.previousBlockHeader=previousBlockHeader
        this.merkleRoot=merkleRoot
        this.timeStamp=timeStamp
        this.target=target
        this.nonce=nonce
    }   
}

class Block{
    constructor(blockIndex,blockHeader,txns){
        this.blockIndex=blockIndex
        this.blockHeader=blockHeader
        this.txns=txns
        if(blockIndex!=1){
            this.blockHeader.merkleRoot=this.createMerkleRoot(this.txns)
            this.currentBlockHash=this.hashBlockHeader()
        }
    }

    hashBlockHeader(){
        return this.#doubleHash(this.blockHeader)
    }
    createMerkleRoot(txns){
        var result=txns
        while(true){
            var temp=[]
            if(result.length==1){
                result=this.#doubleHash(result[0])
                break
            }
            debugger
            for(let i=0;i<result.length;i+=2){
                if(i+1<result.length){
                    temp.push(this.#hashPair(txns[i],txns[i+1]))
                }else{
                    temp.push(this.#hashPair(txns[i],null))
                }
            }
            result=temp
        }
        return result
    }
    #doubleHash(data){
        console.log(JSON.stringify(data))
        const hash=crypto.createHash('sha256')
        var result=hash.update(JSON.stringify(data))
        result=hash.copy().digest('hex')
        hash.update(result)
        result = hash.digest('hex')
        return result
    }
    #hashPair(txn1,txn2){
        let hashTxn1,hashTxn2,subRoot
        if(txn2!=null){
            hashTxn1=this.#doubleHash(txn1)
            hashTxn2=this.#doubleHash(txn2)
            subRoot=this.#doubleHash(hashTxn1+hashTxn2)
        }else{
            hashTxn1=this.#doubleHash(txn1)
            subRoot=this.#doubleHash(hashTxn1+hashTxn1)
        }
        return subRoot
    }
}

module.exports = {Block,BlockHeader,Transaction}