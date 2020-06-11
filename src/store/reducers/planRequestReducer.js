import {
  READ_PLAN_REQUEST_EVENTS,
  READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT,
  PLAN_APPROVAL_EVENT,
  READ_MY_PLAN_REQUEST_EVENTS,
  CHECK_MY_SENT_PLAN_REQUEST_STATUS,
} from '../actionTypes'

const DEFAULT_STATE = {
  // 自分宛に届いたいプランリクエスストの一覧
  receivePlanRequestList: [],
  // 自分が送信したプランリクエスト
  mySendPlanRequestList: [],
  //メッセージルームのユーザープランリクエスト(自分宛に送ってくれたプランリクエスト)
  roomMessageUserPlanRequest: {},
  // ステータスは、３つある (1)プランリクエストを送っていない (2)プランリクエストを送って承認待ち (3)プランリクエストを送って承認あり
  mySentPlanRequestStatus: 'notSentPlanRequest',
}

const planRequestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // =========================================================================================
    // 自分宛に届いた、プランリクエストのデータを処理
    // =========================================================================================
    case READ_PLAN_REQUEST_EVENTS:
      return { ...state, receivePlanRequestList: action.payload }

    // =========================================================================================
    // 自分が送信したプランリクエストの一覧を取得する
    // =========================================================================================
    case READ_MY_PLAN_REQUEST_EVENTS:
      console.log('自分が送信したプランリクエストの一覧を取得する')
      return { ...state, mySendPlanRequestList: action.payload }

    // =========================================================================================
    // 自分宛に届いたプランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する
    // =========================================================================================
    case READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT:
      console.log('プランリクエストリストの中から、メッセージルームユーザーのプランリクエストを取得する')
      // action.payloadには、メッセージルームユーザーのよろずIDが入っている
      const planRequestUser = state.receivePlanRequestList.find((receivePlanRequest) => {
        return receivePlanRequest.senderYorozuId === action.payload
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
    case CHECK_MY_SENT_PLAN_REQUEST_STATUS:
      console.log('ろグインユーザーがプランリクエストを送信した事がある万屋か確認する')
      // action.payload => プランオーナーのID
      // mySendPlanRequest.receiverYorozuId => 自分がプランリクエストを送ったよろずやのID
      const mySentPlanRequest = state.mySendPlanRequestList.find((mySentPlanRequest) => {
        return mySentPlanRequest.receiverYorozuId === action.payload
      })

      // プランリクエストがある場合
      // mySentPlanRequest => {senderYorozuId: "nobita", receiverYorozuId: "shizuka", isApproval: true,....}
      // プランリクエストがない場合
      // mySentPlanRequest => undifind

      // もし、プランリクエストを送った事があるならisSentPlanRequesの中身は、プランリクエストのデータが入っている(tryの方に行く)
      // もし送った事がなければ、isSentPlanRequesはundifindになり、catchの方に行く
      try {
        if (mySentPlanRequest.isApproval) {
          // プランリクエストを送って承認あり
          return { ...state, mySentPlanRequestStatus: 'planRequestApproved' }
        } else {
          // プランリクエストを送っているが承認なし
          return { ...state, mySentPlanRequestStatus: 'planRequestNotApproved' }
        }
      } catch {
        // プランリクエスト送っていない
        return { ...state, mySentPlanRequestStatus: 'notSentPlanRequest' }
      }

    default:
      return state
  }
}

export default planRequestReducer
