import axios, { AxiosResponse } from "axios"
import { API_URL } from "../../App"
import { ApiPath } from "../../commonComponent/objectType/APIpath"
import { walletValidateAccountResponse } from "../auth/AuthApi"

export interface CreateTxRequestBody {
    address: string,
    amount: number,
    fee: number
}


export interface WalletUTxResponse {
    [key: string]: number;
}

export const sendApi_createTx = (body: CreateTxRequestBody) => {
    const path = API_URL + ApiPath.CeateNewTx
    console.log("sendApi_createTx: ", path)
    return axios.post(path, body)
} 

// wallet/unspentTx
export const sendApi_checkWalletUTx = (): Promise<AxiosResponse<WalletUTxResponse>> => {
    const path = API_URL + ApiPath.checkWalletUTx
    console.log("sendApi_checkWalletUTx: ", path)
    return axios.get(path)
} 
