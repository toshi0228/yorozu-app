import Plan from '../../models/plan';
import { CREATE_PLAN } from '../actionTypes';

const DEFAULT_STATE = {
  ...new Plan({})
};

const planReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CREATE_PLAN:
      console.log({ ...action.payload });
      return { ...state, ...action.planContent };

    default:
      return state;
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
