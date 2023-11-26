crypto=require('crypto')
const wallet = require('./wallet')
const { doubleHashLoop }= require('./utility/doubleHash').default

class Transaction{ 
    constructor(toAddess,amount,transaction_input,transaction_output,fee){
        this.toAddess=toAddess
        this.amount=amount
        this.txinCount=transaction_input.length // transaction count
        this.txin=transaction_input
        this.txoutputCount=transaction_output.length
        this.txout=transaction_output
        this.fee=fee 
        this.txid=this.#hashTx()
    }

    #hashTx(){
        return doubleHashLoop(this.fromAddress,this.toAddess,this.amount)
    }

    isTransactionValid(tx){
        var publicKeyHash
        var signature,publicKey
        for (txin in tx.txin){
            publicKeyHash=txin.utxo.txout.lockScript
            signature,publicKey=txin.unlockScript
            if(wallet.publicKeyHash(Buffer.from(publicKey))==publicKeyHash){
                const verify=crypto.createVerify('SHA256')
                verify.update(Buffer.from(publicKeyHash))
                verify.end()
                if(verify.verify(Buffer.from(publicKey),signature)){
                    return(true)
                }
            }
        }
        return(false)
    }
    
    //function validate transaction()
    //throw signature and public key
    //according to script
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
    constructor(previousBlockHeader,merkleRoot,timeStamp){
        this.version=1
        this.previousBlockHeader=previousBlockHeader
        this.merkleRoot=merkleRoot
        this.timeStamp=timeStamp
        this.difficulty=4 
        this.nonce=0
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
        while (this.currentBlockHash.substring(0, this.blockHeader.difficulty) != Array(this.blockHeader.difficulty + 1).join("0")) {
            let timestamp = Date.now();
			this.blockHeader.difficulty = this.adjustDifficulty(lastBlock, timestamp); 
            this.nonce++;
            this.currentBlockHash = this.#doubleHash();
        }
    }

    adjustDifficulty(lastBlock, newBlockTime) {
        let difficulty = lastBlock.BlockHeader.difficulty;
		difficulty = lastBlock.blockHeader.timestamp + 3000 > newBlockTime ? ++difficulty  : --difficulty;
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