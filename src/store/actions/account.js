import { SET_ACCOUNT, SIGN_IN_ACCOUNT } from '../actionTypes';
import { postSignIn } from '../../services/authApiRequest';
import { push } from 'connected-react-router';

export const signIn = formProps => dispatch => {
  return postSignIn(formProps).then(res => {
    dispatch(signInAccount({ ...res.data, authToken: res.data.token }));
    dispatch(push('/create_plan'));
  });
};

const signInAccount = user => {
  return {
    type: SIGN_IN_ACCOUNT,
    payload: { ...user, isLoggedIn: true }
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
