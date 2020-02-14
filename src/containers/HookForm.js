import React, {useState, useReducer, useEffect} from 'react'
import Data from './Data'
import axios from 'axios'

// import { signUp } from '../actions/account'


// const initialState = {
//     email: "",
//     password: "",
// }


const reducer = (state=[], action) =>{
    switch(action.type){
        case 'CREATE_ACCOUNT':
            const length = state.length
            const id = length === 0 ? 1 : state[length - 1].id + 1
            const account = {id, email: action.email, password: action.password}
            return [...state, {...account}]
        default:
            return state
    }
}



function SignUp(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sendState, setSendState] = useState("flase")
    const [state, dispatch] = useReducer(reducer, [])
    


    const asyncAddAccount = async () => {
        let formData = {email, password}
        const response = await axios.post('http://localhost:8080/', formData)
        console.log("サーバーレスポンス")
        console.log(response)
        dispatch({ type:'CREATE_ACCOUNT', response})
    }


    useEffect(()=>{
        asyncAddAccount()
        setEmail('')
        setPassword('')
    }, [sendState])


    return(
        <div>
            <h2>送信ページ</h2>
            <input type='text' value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
            <p>メール：{email}</p>

            <input value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
            <p>パスワード：{password}</p>

            <button onClick={()=>{setSendState("true")}}>送信</button>
            {/* <button onClick={addAccount}>送信</button> */}
            <p>送信状態：{sendState}</p>
            <Data />
        </div>
    )
}

export default SignUp