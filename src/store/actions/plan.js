// import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT } from '../actionTypes';
// import { postPlan } from '../../services/ApiRequest';
// import { getPlanList } from '../../services/ApiRequest';

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

// // プラン登録
// export const postPlanEvent = (planContent) => (dispatch) => {
//   // const submitData = new FormData();
//   // submitData.append('planConten', planConten);
//   return postPlan(planContent);
// };
