crypto=require('crypto')

class Transaction{ 
    constructor(hash,index,script,number=0xFFFFFFFF,fromaddress,toaddress,fee){
        this.hash=hash
        this.index=index 
        this.script=script //Logged script with public key, with signature(encrypted by private key) and public key, use public key to decrypt
        this.number=number // transaction count
        this.to.address=toaddress
        this.fromaddress=fromaddress
        this.fee=fee

        this.transaction_output=this.transaction_output()


    }

    transaction_output(receiverinfo) {
        this.receiveraddr = 
        this.amount
    }

    #transaction_input() {
        this.txID
        this.txIndex
        this.signature
    }
    
    //function validate transaction()
    //throw signature and public key
    //according to script
}

class BlockHeader{
    constructor(previousBlockHeader,merkleRoot,timeStamp,target,nonce){
        this.version=1
        this.previousBlockHeader=previousBlockHeader
        this.merkleRoot=merkleRoot
        this.timeStamp=timeStamp
        this.target=target //=difficulty
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

    mineBlock(lastBlock) {
        while (this.currentBlockHash.substring(0, this.difficulty) != Array(this.difficulty + 1).join("0")) {
            let timestamp = Date.now();
			this.difficulty = this.adjustDifficulty(lastBlock, timestamp);

            this.nonce++;
            this.hash = this.#doubleHash();
        }
    }

    adjustDifficulty(lastBlock, newBlockTime) {
        let difficulty = lastBlock.difficulty;
		difficulty = lastBlock.timestamp + 3000 > newBlockTime ? ++difficulty  : --difficulty; //Leave for TA 
		if(difficulty < 1) difficulty = 1;
		return difficulty;
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