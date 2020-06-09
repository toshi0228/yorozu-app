import { READ_PLAN_REQUEST_EVENT } from '../actionTypes'

const DEFAULT_STATE = {
  planRequestList: [],
  // recieveMessage: [],
  // rowDataRecieveMessage: [],
}

const planRequestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // 自分宛の届いた、プランリクエストのデータを処理
    case READ_PLAN_REQUEST_EVENT:
      return { ...state, planRequestList: action.payload }
    default:
      return state
  }
}

export default planRequestReducer
