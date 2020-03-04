import { SET_ACCOUNT, SIGN_IN_ACCOUNT } from '../actionTypes';

export const signInAccount = user => {
  return {
    type: SIGN_IN_ACCOUNT,
    payload: { ...user, isLoggedIn: true }
  };
};

// const signInAccount = user => ({
//   type: SIGN_IN_ACCOUNT,
//   payload: { ...user, isLoggedIn: true, errors: [] },
// })

export const signIn = formProps => {
  return {
    type: SIGN_IN_ACCOUNT,
    payload: {
      token: 'aa1',
      id: 1,
      email: formProps.inputEmail,
      username: formProps.inputPassword,
      isLoggedIn: true
    }
  };
};

export const signUp = acountInfo => {
  return {
    type: SET_ACCOUNT,
    payload: {
      token: 'aa1',
      id: 3,
      email: acountInfo.inputEmail,
      username: acountInfo.inputPassword
    }
  };
};
