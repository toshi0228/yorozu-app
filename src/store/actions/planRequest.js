import { getPlanRequestList, patchPlanApprovalStatus, getMyPlanRequestList } from '../../services/ApiRequest'
import {
  READ_PLAN_REQUEST_EVENTS,
  READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT,
  PLAN_APPROVAL_EVENT,
  READ_MY_PLAN_REQUEST_EVENTS,
  CHECK_MY_SENT_PLAN_REQUEST_STATUS,
} from '../actionTypes'

// =================================================================================
// 自分宛に届いたプランリクエストを取得する
// =================================================================================
export const feachPlanRequest = (authToken) => (dispatch) => {
  getPlanRequestList(authToken).then((planRequestList) => {
    dispatch(readPlanRequest(planRequestList))
  })
}

// =================================================================================
// 自分宛に届いたプランリクエストを取得する時に、使うアクションクリエーター
// =================================================================================

export const readPlanRequest = (planRequestList) => {
  return {
    type: READ_PLAN_REQUEST_EVENTS,
    payload: planRequestList.data,
  }
}

// =================================================================================
// 自分が送信したプランリクエストの一覧を取得する
// =================================================================================
export const feachMyPlanRequest = (authToken) => (dispatch) => {
  getMyPlanRequestList(authToken).then((myPlanRequestList) => {
    dispatch(readMyPlanRequest(myPlanRequestList))
  })
}

// =================================================================================
// 自分が送信したプランリクエストの一覧を取得する時に、使うアクションクリエーター
// =================================================================================

export const readMyPlanRequest = (myPlanRequestList) => {
  return {
    type: READ_MY_PLAN_REQUEST_EVENTS,
    payload: myPlanRequestList.data,
  }
}

// =================================================================================
// メッセージルームページのユーザーよって、プランリクエストのユーザーを取得する
// =================================================================================

export const readRoomMessageUserPlanRequest = (roomMessageUserYorozuId) => {
  return {
    type: READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT,
    payload: roomMessageUserYorozuId,
  }
}
// =================================================================================
// プランページに移動した時に、ログインユーザーのプランリクエストの状態を確認する
// (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
// 自分が送ったプランリクエストの状態 1. プランリクエストを送信してない 2.承認されていない 3.承認された
// =================================================================================

export const checkMySentPlanRequestStatus = (planOwnerYorozuId) => {
  return {
    type: CHECK_MY_SENT_PLAN_REQUEST_STATUS,
    payload: planOwnerYorozuId,
  }
}

// =================================================================================
// 自分宛に届いたプランリクエストを承認する
// =================================================================================
// planRequestUserYorozuId => プランをリクエストしてくれたユーザーのyorozuId
export const patchPlanApproval = (planRequestUserYorozuId) => (dispatch) => {
  patchPlanApprovalStatus(planRequestUserYorozuId).then((approvedPlanRequest) => {
    dispatch(planRequestApproval(approvedPlanRequest))
  })
}

// =================================================================================
// 自分宛に届いたプランリクエストを承認した後の、アクションクリエーター
// =================================================================================
// approvedPlanRequest => 承認の変数,isApprovalがfalseからtrueに変化
export const planRequestApproval = (approvedPlanRequest) => {
  return {
    type: PLAN_APPROVAL_EVENT,
    payload: approvedPlanRequest.data,
  }
}
