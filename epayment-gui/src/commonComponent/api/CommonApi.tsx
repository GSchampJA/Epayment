import axios, { AxiosResponse } from "axios"
import { API_URL } from "../../App"
import { ApiPath } from "../objectType/APIpath"
import { Block } from "../objectType/BlockchainType"


export interface stopMiningRequestBody {
    isMining: boolean
}

export interface stopMiningResponse {
    isMining: boolean
}

// export const sendApi_stopMining = (body: stopMiningRequestBody) => {
//     const path = API_URL + ApiPath.StopMining
//     console.log("sendApi_stopMining: ", path)
//     return axios.post(path, body)
// } 



export const sendApi_stopMining = (): Promise<AxiosResponse<stopMiningResponse>> => {
    const path = API_URL + ApiPath.StopMining
    console.log("sendApi_stopMining: ", path)
    return axios.get(path)
} 

export const sendApi_searchBlock = (blockIndex: number): Promise<AxiosResponse<Block>>  => {
    const path = API_URL + ApiPath.searchBlock
    console.log("sendApi_stopMining: ", path)
    return axios.get(path, {
        params: {
          blockIndex: blockIndex,
        },
    });
} 