import axios from 'axios'
import {SIGN_IN_ACCOUNT} from '../constants/actionTypes'

export const READ_EVENTS = "READ_EVENTS"

const ROOT_URL = 'url'
const QUERYSTRING = 'token'




export const readEvents = () => async dispatch => {
       const response = await axios.get(`${ROOT_URL}/aaaa/${QUERYSTRING}`)
       dispatch({type: READ_EVENTS}, response)
}


export const login = () => {
    return {type: SIGN_IN_ACCOUNT}
}


// export const plus = num =>{
//     return {type: "PLUS", payload: {num: num}}
// };