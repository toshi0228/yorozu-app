import { SET_ACCOUNT, SIGN_IN_ACCOUNT } from '../actionTypes';
import Account from '../../models/account';

export const DEFAULT_STATE = {
  ...new Account({}),
  token: '',
  isLoggedIn: false
};

const accountReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return state;

    case SIGN_IN_ACCOUNT:
      console.log(action.payload);
      return { ...state, ...action.payload };

    case 'CREATE_ACCOUNT':
      return { ...state, ...action.res };

    case 'LOGIN':
      console.log('アカウントログイン');
      return { ...state, ...action.res };

    default:
      return state;
  }
};

export default accountReducer;
