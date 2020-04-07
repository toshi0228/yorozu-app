import { READ_TAG_EVENTS } from '../actionTypes';
import { feachTags } from '../../services/ApiRequest';

// import { setAuthHeader } from '../../services/ApiRequest';

// =====================================================================================
// 非同期の場合は、API通信を行って、そこから取得した値をとってから値をstoreに飛ばしたい。
// コンポネーント側でreadTagEvent()をした特に、action側で()()だから、コンポーネント側で
// readTagEvent()()にしないといけないと思ったが、最後の関数実行は、thunkがやっているのだ
// thunkは「必要になったときに処理を行う」という意味。つまり、API通信を行って値が届いたら行う
// というイメージだ
// イメージ
// store   <---- dispatch()
// storeにdispatchが届き、その値が関数だったら、処理を行うというイメージ
// このときに使われるのがthunk
// =====================================================================================

// =====================================================================================
// 非同期で押えるべきポイント
// storeに値を届ける場合は、dispatch()でないとstoreに値を届けられない
// storeにささった状態のオブジェクトは届く
// 同期の場合
// store<---- dispatch(オブジェクト)

// 非同期の場合
// store<---- dispatch(空のオブジェクト)
// APIでデータ取得(3秒後と仮定)
// もうdispatchはなくオブジェクトだけになる
// store<----オブジェクト

// これではよくないので
// APIでデータ取得(3秒後)もdispatchを発射したい
// イメージ

// ＊＊＊非同期
//                 =========  dispatch  ==========
// store<----------===  dispatch(オブジェクト)  ====
//                 ===============================
// store<----dispatch(オブジェクト)

// つまり、関数の中に関数をまるめこむ
// これで問題解決かと思いきやまだ問題が残る
// では、最後の関数を誰が実行するのだ

// ここでてくるのが、thunk
// 「必要になったときに処理を行うのがthunkの役目

// dispatch(type,payload)なら値は届く
// =====================================================================================

export const readTagEvent = () => dispatch => {
  feachTags().then(res => {
    dispatch(readTag({ ...res.data }));
  });
};

export const readTag = tags => {
  return {
    type: READ_TAG_EVENTS,
    payload: { ...tags }
  };
};

// export const signIn = formProps => dispatch => {
//   return postSignIn(formProps)
//     .then(res => {
//       // リクエストをするときにアクセストークンをヘッダーにセットする
//       setAuthHeader(res.data);

//       // accountReducerにセットする
//       dispatch(signInAccount({ authToken: { ...res.data } }));

//       // dispatch(signInAccount({ ...res.data, authToken: res.data.token }));
//       dispatch(push('/create_plan'));
//     })
//     .catch(e => {
//       console.log(`${e} ログイン失敗`);
//     });
// };

// const signInAccount = user => {
//   return {
//     type: SIGN_IN_ACCOUNT,
//     payload: { ...user, isLoggedIn: true }
//   };
// };

// export const readTag = () => dispatch => {
//   return feachTags().then(res => {
//     setTag();
//   });
// };

// const setTag = () => {
//   return {
//     type: READ_TAG
//   };
// };

// const feachTags = async () => {
//   const response = await axios.get('http://127.0.0.1:8000/api/tag/');
//   const tags = response.data.reduce((previous, tag) => {
//     previous.push(tag.name);
//     return previous;
//   }, []);

// export const readTag = () => dispatch => {
//   return {
//     type: READ_TAG
//   };
// };

// import { SET_ACCOUNT, SIGN_IN_ACCOUNT } from '../actionTypes';
// import { postSignIn, postSignUp } from '../../services/authApiRequest';
// import { push } from 'connected-react-router';
// import { setAuthHeader } from '../../services/ApiRequest';
