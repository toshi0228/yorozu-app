import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT } from '../actionTypes'
import { postPlan } from '../../services/ApiRequest'
import { postPlanRequest } from '../../services/ApiRequest'

// プランの承認
export const planRequest = (requestData) => (dispatch) => {
  console.log(`acttionがよばれた:${requestData}`)
  console.log(requestData)
  postPlanRequest(requestData).then((res) => {
    console.log('プランのリクエスト完了')
    console.log(res)
  })
}
// export const postPlan = () => (dispatch) {
//   postRequestRequest()
// };

// // プランリストの読み込み
// export const fetchPlanList = () => (dispatch) => {
//   getPlanList().then((res) => {
//     dispatch(readPlanList(res.data));
//   });
// };

// // プランリストのアクションクリエーター
// export const readPlanList = (fetchPlanListData) => {
//   return {
//     type: READ_PLAN_EVENTS,
//     payload: fetchPlanListData,
//   };
// };

// プラン登録
export const postPlanEvent = (planContent) => (dispatch) => {
  // const submitData = new FormData();
  // submitData.append('planConten', planConten);
  return postPlan(planContent)
}
