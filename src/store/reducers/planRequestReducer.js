import { READ_PLAN_REQUEST_EVENTS, READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT } from '../actionTypes'

const DEFAULT_STATE = {
  planRequestList: [],
  //メッセージルームのユーザープランリクエスト
  roomMessageUserPlanRequest: {},
  // rowDataRecieveMessage: [],
}

const planRequestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // 自分宛の届いた、プランリクエストのデータを処理
    case READ_PLAN_REQUEST_EVENTS:
      return { ...state, planRequestList: action.payload }

    // プランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する
    case READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT:
      // action.payloadには、メッセージルームユーザーのよろずIDが入っている
      const planRequestUser = state.planRequestList.find((planRequest) => {
        return planRequest.senderYorozuId === action.payload
      })
      return { ...state, roomMessageUserPlanRequest: planRequestUser }
    default:
      return state
  }
}

export default planRequestReducer
