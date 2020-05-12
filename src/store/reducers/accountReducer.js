import { SIGN_IN_ACCOUNT } from '../actionTypes'
// import Account from '../../models/account';

export const DEFAULT_STATE = {
  authToken: '',
  // authToken: { refresh: '', access: 'a' },
  yorozuId: '',
  isLoggedIn: false,
  // ...new Account({}),
}

const accountReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_ACCOUNT:
      return { ...state, ...action.payload }

    case 'CREATE_ACCOUNT':
      return { ...state, ...action.res }

    default:
      return state
  }
}

export default accountReducer
