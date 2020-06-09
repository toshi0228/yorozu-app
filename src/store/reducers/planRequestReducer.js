import { READ_PLAN_REQUEST_EVENTS, READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT, PLAN_APPROVAL_EVENT } from '../actionTypes'

const DEFAULT_STATE = {
  planRequestList: [],
  //メッセージルームのユーザープランリクエスト
  roomMessageUserPlanRequest: {},
  // rowDataRecieveMessage: [],
}

const planRequestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ======================================================================
    // 自分宛の届いた、プランリクエストのデータを処理
    // ======================================================================
    case READ_PLAN_REQUEST_EVENTS:
      console.log(action.payload)
      return { ...state, planRequestList: action.payload }

    // ======================================================================
    // プランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する
    // ======================================================================
    case READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT:
      console.log('プランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する')
      // action.payloadには、メッセージルームユーザーのよろずIDが入っている
      const planRequestUser = state.planRequestList.find((planRequest) => {
        return planRequest.senderYorozuId === action.payload
      })

      return { ...state, roomMessageUserPlanRequest: planRequestUser }

    // ======================================================================
    // よろず屋が、お客さんのプランリクエストの承認を行う
    // ======================================================================
    case PLAN_APPROVAL_EVENT:
      // action.payload => 承認の変数,isApprovalがfalseからtrueに変化した値が入っている
      return { ...state, roomMessageUserPlanRequest: action.payload }

    default:
      return state
  }
}

export default planRequestReducer
