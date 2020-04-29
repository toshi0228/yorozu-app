import Plan from '../../models/plan';
import { READ_PLAN_EVENTS, CREATE_PLAN_EVENT } from '../actionTypes';

const DEFAULT_STATE = {
  ...new Plan({}),
};

const planReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // 最初にプランリストを読み込む処理
    // 読み込み時、配列出ないとうまく行かないので、そのまま渡す
    case READ_PLAN_EVENTS:
      return action.payload;
    case CREATE_PLAN_EVENT:
      return { ...state, ...action.planContent };
    default:
      return '';
  }
};

export default planReducer;

// const reducer = (state=[], action) =>{
//     switch(action.type){
//         case 'CREATE_ACCOUNT':
//             const length = state.length
//             const id = length === 0 ? 1 : state[length - 1].id + 1
//             const account = {id, email: action.email, password: action.password}
//             return [...state, {...account}]
//         default:
//             return state
//     }
// }
