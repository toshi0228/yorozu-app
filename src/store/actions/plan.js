import { CREATE_PLAN_EVENT } from '../actionTypes';
import { postPlan } from '../../services/ApiRequest';

export const postPlanEvent = planContent => dispatch => {
  // const submitData = new FormData();
  // submitData.append('planConten', planConten);
  return postPlan(planContent);
};

// export const postPlanEvent = planContent => dispatch => {
//   return {
//     type: CREATE_PLAN_EVENT,
//     payload: planContent
//   };
// };

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
