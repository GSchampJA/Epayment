
export interface Block {
    index: number,
    timestamp: Date,
    data: string,
    previousHash: string,
    hash: string,
    nonce: number,
    difficulty: number
}

export interface BlockHeader {
    index: number,
    timestamp: Date,
    data: string,
    previousHash: string,
    hash: string,
    nonce: number,
    difficulty: number
}

export interface TxAddress {
    address: string,
    sent?: number,
    received?: number
}

export interface Transaction {
    fromTxAdd: TxAddress,
    toTxAdd: TxAddress[],
    txAmount: number,
    txFees?: number,
    timestamp: Date
}

// address of searching (keeping their own transaction records)
export interface Address {
    address: string,
    totalReceived?: number,
    totalSent?: number,
    balance?: number,       //  totalReceived - totalSent
    transcations: Transaction[]
}


// export default interface Transaction {
//     index: number,
//     hash: string,
//     script: string,
//     number: number,
// }


