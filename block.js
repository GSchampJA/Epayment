crypto=require('crypto')
const wallet = require('./wallet')

class Transaction{ 
    constructor(transaction_input,transaction_output,fee){
        this.txid=txid
        this.txinCount=transaction_input.length // transaction count
        this.txin=transaction_input
        this.txoutputCount=transaction_output.length
        this.txout=transaction_output
        this.fee=fee
    }

    
    isTransactionValid(tx){
        const verify=crypto.createVerify('SHA256')
        var publicKeyHash=tx.txin.utxo.txout.lockScript
        var signature,publicKey=JSON.parse(tx.txin.unlockScript)
        if(wallet.publicKeyHash(Buffer.from(publicKey))==publicKeyHash){
            verify.update(Buffer.from(tx.txin.utxo.txout.lockScript))
            verify.end()
            if(verify.verify(Buffer.from(publicKey),signature)){
                return(true)
            }
        }
        return(false)
    }
    
    //function validate transaction()
    //throw signature and public key
    //according to script
    createTransaction(){

    }
}



//utxo=>transaction unspent, index => number of index of utxo to be spent

class txin{
    constructor(utxo,index,unlockScript){
        this.utxo=utxo
        this.index=index
        this.unlockScript=unlockScript 
    }
}
class txout{
    constructor(amount,lockScript){
        this.amount=amount
        this.lockScript=lockScript  //Logged script with public key, with signature(encrypted by private key) and public key, use public key to decrypt 
    }
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
        var result=hash.copy().update(Buffer.from(JSON.stringify(data))).digest()
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