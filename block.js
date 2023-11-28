crypto=require('crypto')
const { time } = require('console');
const { doubleHashLoop,publicKeyHashfunc }= require('./utility/hashUtility')
const moment=require('moment');

//transaction_input,transaction_output must be array
class Transaction{ 
    constructor(txid,toAddess,amount,transaction_input,transaction_output,fee,timestamp){
        this.txid=txid
        this.toAddess=toAddess
        this.amount=amount
        this.txinCount=transaction_input.length // transaction count
        this.txin=transaction_input //array
        this.txoutputCount=transaction_output.length
        this.txout=transaction_output ///array
        this.fee=fee 
        this.timestamp=timestamp
    }


    
    //function validate transaction()
    //throw signature and public key
    //according to script
}



//utxo=>transaction unspent, index => number of index of utxo to be spent
//from address is not the utxo sender, but the of the utxo receiver
class txin{
    constructor(address,utxo,index,unlockScript){
        this.fromAddress=address
        this.utxo=utxo
        this.index=index
        this.unlockScript=unlockScript 
    }
}
class txout{
    constructor(address,amount,lockScript){
        this.toAddress=address
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
//blockindex => height
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
                result=doubleHashLoop(result[0])
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
            this.hash = doubleHashLoop('123');
        }
    }

    adjustDifficulty(lastBlock, newBlockTime) {
        let difficulty = lastBlock.BlockHeader.difficulty;
		difficulty = lastBlock.blockHeader.timestamp + 3000 > newBlockTime ? ++difficulty  : --difficulty;
		if(difficulty < 1) difficulty = 1;
		return difficulty;
	}

    // new double hash is in utility now
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
            hashTxn1=doubleHashLoop(txn1)
            hashTxn2=doubleHashLoop(txn2)
            subRoot=doubleHashLoop(hashTxn1+hashTxn2)
        }else{
            hashTxn1=doubleHashLoop(txn1)
            subRoot=doubleHashLoop(hashTxn1+hashTxn1)
        }
        return subRoot
    }
}

module.exports = {Block,BlockHeader,Transaction,txin,txout}