import axios, { AxiosResponse } from "axios"
import { API_URL } from "../../App"
import { ApiPath } from "../../commonComponent/objectType/APIpath"

export interface walletCreateRespon {
    publicKeyHash: string,
    privateKey: string
}

export interface wallet_validExistingRequestBody {
    address: string,
    privateKey: string
}

export const sendApi_walletCreate = (): Promise<AxiosResponse<walletCreateRespon>> => {
    const path = API_URL + ApiPath.Create_Address
    console.log("sendApi_walletCreate: ", path)
    return axios.post<walletCreateRespon>(path)
} 

export interface walletValidateAccountResponse {
    login: boolean
}

export const sendApi_wallet_validExisting = (body: wallet_validExistingRequestBody): Promise<AxiosResponse<walletValidateAccountResponse>> => {
    const path = API_URL + ApiPath.Validate_Address
    console.log("sendApi_wallet_validExisting: ", path)
    return axios.post(path, body)
} 

