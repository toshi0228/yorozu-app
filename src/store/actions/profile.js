import { READ_PROFILE_EVENTS, READ_PROFILE_DETAIL_EVENT } from '../actionTypes';
import { getProfileList } from '../../services/ApiRequest';
import { getProfileDetail } from '../../services/ApiRequest';
// import { postPlan } from '../../services/ApiRequest';

// プロフィールリストの読み込み
export const fetchProfileList = () => (dispatch) => {
  getProfileList().then((res) => {
    dispatch(readProfileList(res.data));
  });
};

// プロフィールのアクションクリエーター
export const readProfileList = (fetchProfileListData) => {
  return {
    type: READ_PROFILE_EVENTS,
    payload: fetchProfileListData,
  };
};

// プラン登録  これはあとで登録画面の時修正したい
// export const postProfileEvent = (ProfileContent) => (dispatch) => {
//   return postProfile(ProfileContent);
// };

// =====================================================================================

// import { READ_PROFILE_EVENTS } from '../actionTypes';

// 万屋の詳細ページのhttpリクエスト;
export const feachProfileDetail = (id) => (dispatch) => {
  return getProfileDetail(id).then((res) => {
    dispatch(readProfile(res.data));
  });
};

// 万屋の詳細ページのアクション
export const readProfile = (fetchProfileData) => {
  return {
    type: READ_PROFILE_DETAIL_EVENT,
    payload: fetchProfileData,
  };
};

// =====================================================================================
// 2020 4 28
// conast foo = () => (dispatch){
//     return bar
// }

// midlwareを設定するとdispatchは、midlwareに向かうが中身は
// const thunk = (store) => (next) => action =>{
//     if (typeof action === 'function'){
//         return action(store.dispatch, store.getState)
//     }
// }

// container側でディスパッチを行なっても関数が返ってくるので,dispatchを受けとることができる
// dispatch(feachProfile())

// =====================================================================================