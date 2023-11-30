import axios from "axios"
import { API_URL } from "../../App"
import { ApiPath } from "../objectType/APIpath"


export interface stopMiningRequestBody {
    isMining: boolean
}



// export const sendApi_stopMining = (body: stopMiningRequestBody) => {
//     const path = API_URL + ApiPath.StopMining
//     console.log("sendApi_stopMining: ", path)
//     return axios.post(path, body)
// } 

export const sendApi_stopMining = () => {
    const path = API_URL + ApiPath.StopMining
    console.log("sendApi_stopMining: ", path)
    return axios.get(path)
} 