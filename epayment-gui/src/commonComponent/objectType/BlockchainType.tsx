export interface Block {
    blockIndex: number;
    blockHeader: {
      version: number;
      previousBlockHeader: string;
      merkleRoot: string;
      timeStamp: string;
      difficulty: number;
      nonce: number;
    };
    txns: [];
    currentBlockHash: string;
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


export interface UtxO {
    txid: string,
    vout?: 1 | 0,         //  number,      //  index or position of a specific output within a transaction
    address: string,
    label?: string,
    scriptPubKey: string,
    amount: number,
    confirmations?: number,
    spendable: boolean,
    solvable?: boolean,
    desc?: string,
    parent_descs?: string[],
    safe?: boolean
}


export const utxosExample: UtxO[] = [
    {
      txid: "txid1",
      vout: 0,
      address: "address1",
      label: "label1",
      scriptPubKey: "script1",
      amount: 1.5,
      confirmations: 10,
      spendable: true,
      solvable: true,
      desc: "desc1",
      parent_descs: ["parent1", "parent2"],
      safe: true
    },
    {
      txid: "txid2",
      vout: 1,
      address: "address2",
      scriptPubKey: "script2",
      amount: 0.75,
      confirmations: 5,
      spendable: true,
      solvable: true,
      desc: "desc2",
      parent_descs: ["parent3"],
      safe: true
    },
    {
        txid: "txid3",
        vout: 0,
        address: "address4",
        label: "label1",
        scriptPubKey: "script1",
        amount: 1.5,
        confirmations: 10,
        spendable: true,
        solvable: true,
        desc: "desc1",
        parent_descs: ["parent1", "parent2"],
        safe: true
    },
    {
        txid: "txid4",
        vout: 1,
        address: "address2",
        scriptPubKey: "script2",
        amount: 0.75,
        confirmations: 5,
        spendable: true,
        solvable: true,
        desc: "desc2",
        parent_descs: ["parent3"],
        safe: true
    },
    {
        txid: "txid5",
        vout: 0,
        address: "address1",
        label: "label1",
        scriptPubKey: "script1",
        amount: 1.5,
        confirmations: 10,
        spendable: true,
        solvable: true,
        desc: "desc1",
        parent_descs: ["parent1", "parent2"],
        safe: true
    },
    {
        txid: "txid6",
        vout: 1,
        address: "address2",
        scriptPubKey: "script2",
        amount: 0.75,
        confirmations: 5,
        spendable: true,
        solvable: true,
        desc: "desc2",
        parent_descs: ["parent3"],
        safe: true
    },
    {
        txid: "txid7",
        vout: 0,
        address: "address1",
        label: "label1",
        scriptPubKey: "script1",
        amount: 1.5,
        confirmations: 10,
        spendable: true,
        solvable: true,
        desc: "desc1",
        parent_descs: ["parent1", "parent2"],
        safe: true
    },
    {
        txid: "txid8",
        vout: 1,
        address: "address2",
        scriptPubKey: "script2",
        amount: 0.75,
        confirmations: 5,
        spendable: true,
        solvable: true,
        desc: "desc2",
        parent_descs: ["parent3"],
        safe: true
    },
    {
        txid: "txid9",
        vout: 0,
        address: "address1",
        label: "label1",
        scriptPubKey: "script1",
        amount: 1.5,
        confirmations: 10,
        spendable: true,
        solvable: true,
        desc: "desc1",
        parent_descs: ["parent1", "parent2"],
        safe: true
    },
    {
        txid: "txid10",
        vout: 1,
        address: "address2",
        scriptPubKey: "script2",
        amount: 0.75,
        confirmations: 5,
        spendable: true,
        solvable: true,
        desc: "desc2",
        parent_descs: ["parent3"],
        safe: true
    }

];


// export interface Block {
//     index: number,
//     timestamp: Date,
//     data: string,
//     previousHash: string,
//     hash: string,
//     nonce: number,
//     difficulty: number
// }

// export interface BlockHeader {
//     index: number,
//     timestamp: Date,
//     data: string,
//     previousHash: string,
//     hash: string,
//     nonce: number,
//     difficulty: number
// }

