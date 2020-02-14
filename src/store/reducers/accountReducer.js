import Account from '../../models/account'

export const DEFAULT_STATE ={
    ...new Account({}),
    token: '',
    isLoggedIn: false,
}


const accountReducer = (state = DEFAULT_STATE, action) =>{
    switch (action.type) {
        case "CREATE_ACCOUNT":
            return {...state, ...action.res}
        case "LOGIN":
            return {...state, ...action.res}
        default:
            return state
    }
}


export default accountReducer;



// const reducer = (state=[], action) =>{
//     switch(action.type){
//         case 'CREATE_ACCOUNT':
//             const length = state.length
//             const id = length === 0 ? 1 : state[length - 1].id + 1
//             const account = {id, email: action.email, password: action.password}
//             return [...state, {...account}]
//         default:
//             return state
//     }
// }
