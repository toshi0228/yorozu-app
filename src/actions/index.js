// import axios from 'axios'
import {SIGN_IN_ACCOUNT} from '../constants/actionTypes'

export const READ_EVENTS = "READ_EVENTS"

// const ROOT_URL = 'url'
// const QUERYSTRING = 'token'


export const readEvents = ()  => {
    return ({type: READ_EVENTS})
}


export const sigIn = () => {
    console.log("sigInのaction処理が実装された")
    return {
        type: SIGN_IN_ACCOUNT,
        payload: {
            token:"aaa",
            account: {
                id: 1,
                email: "aaa@gmail.com",
                username: "toshi"
            }
        }
    }
}


// cosnt signInAccount = user => ({
//     type: SIGN_IN_ACCOUNT,
//     payload: {...user, isLoggedIn: true, errors: []}
// })


// const signInAccount = user => ({
//     type: SIGN_IN_ACCOUNT,
//     payload: { ...user, isLoggedIn: true, errors: [] },
//   })



// export const readEvents = () => async dispatch => {
//        const response = await axios.get(`${ROOT_URL}/aaaa/${QUERYSTRING}`)
//        dispatch({type: READ_EVENTS}, response)
// }





// export const plus = num =>{
//     return {type: "PLUS", payload: {num: num}}
// };