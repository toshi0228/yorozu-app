import {
  READ_PLAN_REQUEST_EVENTS,
  READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT,
  PLAN_APPROVAL_EVENT,
  READ_MY_PLAN_REQUEST_EVENTS,
  IS_SENT_PLAN_REQUEST_USER,
} from '../actionTypes'

const DEFAULT_STATE = {
  // 自分宛に届いたいプランリクエスストの一覧
  planRequestList: [],
  // 自分が送信したプランリクエスト
  mySendPlanRequestList: [],
  //メッセージルームのユーザープランリクエスト
  roomMessageUserPlanRequest: {},
  // よろずやのプランページごとのプランリクエスト状況
  planRequestStatus: {},
  // よろずやのプランに、プランリクエストを送信した事があるか
  isSentPlanRequest: false,
}

const planRequestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // =========================================================================================
    // 自分宛の届いた、プランリクエストのデータを処理
    // =========================================================================================
    case READ_PLAN_REQUEST_EVENTS:
      console.log(action.payload)
      return { ...state, planRequestList: action.payload }

    // =========================================================================================
    // 自分が送信したプランリクエストの一覧を取得する
    // =========================================================================================
    case READ_MY_PLAN_REQUEST_EVENTS:
      console.log('自分が送信したプランリクエストの一覧を取得する')
      return { ...state, mySendPlanRequestList: action.payload }

    // =========================================================================================
    // プランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する
    // =========================================================================================
    case READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT:
      console.log('プランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する')
      // action.payloadには、メッセージルームユーザーのよろずIDが入っている
      const planRequestUser = state.planRequestList.find((planRequest) => {
        return planRequest.senderYorozuId === action.payload
      })

      return { ...state, roomMessageUserPlanRequest: planRequestUser }

    // =========================================================================================
    // よろず屋が、お客さんのプランリクエストの承認を行う
    // =========================================================================================
    case PLAN_APPROVAL_EVENT:
      // action.payload => 承認の変数,isApprovalがfalseからtrueに変化した値が入っている
      return { ...state, roomMessageUserPlanRequest: action.payload }

    // =========================================================================================
    // プランページに移動した時に、ログインユーザーがプランリクエストを送信した事がある万屋か確認する
    // (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
    // =========================================================================================
    case IS_SENT_PLAN_REQUEST_USER:
      console.log('ろグインユーザーがプランリクエストを送信した事がある万屋か確認する')
      // action.payload => プランオーナーのID
      // mySendPlanRequest.receiverYorozuId => 自分がプランリクエストを送ったよろずやのID
      const isSentPlanRequest = state.mySendPlanRequestList.find((mySentPlanRequest) => {
        return mySentPlanRequest.receiverYorozuId === action.payload
      })

      // もし、プランリクエストを送った事があるならisSentPlanRequesの中身は、プランリクエストのデータが入っている
      // もし送った事がなければ、isSentPlanRequesはundifindになり、falseになる
      if (isSentPlanRequest) {
        return { ...state, isSentPlanRequest: true, planRequestStatus: isSentPlanRequest }
      } else {
        return { ...state, isSentPlanRequest: false, planRequestStatus: {} }
      }

    default:
      return state
  }
}

export default planRequestReducer
