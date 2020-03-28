import { SET_ACCOUNT, SIGN_IN_ACCOUNT } from '../actionTypes';
import { postSignIn, postSignUp } from '../../services/authApiRequest';
import { push } from 'connected-react-router';
import { setAuthHeader } from '../../services/ApiRequest';

export const signIn = formProps => dispatch => {
  return postSignIn(formProps)
    .then(res => {
      // リクエストをするときにアクセストークンをヘッダーにセットする
      setAuthHeader(res.data);

      // accountReducerにセットする
      dispatch(signInAccount({ authToken: { ...res.data } }));

      // dispatch(signInAccount({ ...res.data, authToken: res.data.token }));
      dispatch(push('/create_plan'));
    })
    .catch(e => {
      console.log(`${e} ログイン失敗`);
    });
};

export const signUp = formProps => dispatch => {
  // 新規登録を行う
  postSignUp(formProps).then(res => {
    // 新規登録が完了したら、アクセストークンをもらいにいく
    postSignIn(formProps).then(res => {
      // リクエストをするときにアクセストークンをヘッダーにセットする
      setAuthHeader(res.data);
      // accountReducerにトークンをセットする
      dispatch(signInAccount({ authToken: { ...res.data } }));
      dispatch(push('/create_plan'));
    });
  });
};

const signInAccount = user => {
  return {
    type: SIGN_IN_ACCOUNT,
    payload: { ...user, isLoggedIn: true }
  };
};
