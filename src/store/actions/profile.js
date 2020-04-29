import { READ_PROFILE_EVENTS } from '../actionTypes';
import { getProfile } from '../../services/ApiRequest';
import { getNodeText } from '@testing-library/react';

// axios通信
export const feachProfile = () => (dispatch) => {
  return getProfile().then((res) => {
    dispatch(readProfile(res.data));
  });
};

// action
export const readProfile = (fetchProfileData) => {
  return {
    type: READ_PROFILE_EVENTS,
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
