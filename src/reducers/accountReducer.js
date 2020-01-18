import {SIGN_IN_ACCOUNT} from '../constants/actionTypes'
import Account from '../models/account'


const DEFAULT_STATE = {
    ...new Account({id:'1', email:'aaa@gmail',username:'toshi' }),
}




const accountReducer = (state = DEFAULT_STATE, action) => {
    
    switch(action.type){
        case SIGN_IN_ACCOUNT:
            console.log("lsigIn:accounReducer")
            console.log(state)
            return state
        default:
            return state;
    }
};


export default accountReducer;


// import {
//     SET_ACCOUNT,
//     SIGN_IN_ACCOUNT,
//     SIGN_OUT,
//   } from '../constants/actionTypes'
//   import Account from '../models/account'
  
//   const DEFAULT_STATE = {
//     ...new Account({}),
//     authToken: '',
//     isLoggedIn: false,
//     isLoaded: false,
//   }
  
//   export default (state = DEFAULT_STATE, action) => {
//     switch (action.type) {
//       case SET_ACCOUNT:
//         return { ...state, ...action.payload, isLoaded: false }
//       case SIGN_IN_ACCOUNT:
//         return { ...state, ...action.payload, isLoaded: false }
//       case SIGN_OUT:
//         return DEFAULT_STATE
//       default:
//         return state
//     }
//   }
  