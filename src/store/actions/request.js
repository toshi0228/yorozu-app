import { getPlanRequestList, patchPlanApprovalStatus } from '../../services/ApiRequest'
import { READ_PLAN_REQUEST_EVENTS, READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT, PLAN_APPROVAL_EVENT } from '../actionTypes'

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
// メッセージルームページのユーザーよって、プランリクエストのユーザーを取得する
// =================================================================================

export const readRoomMessageUserPlanRequest = (roomMessageUserYorozuId) => {
  return {
    type: READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT,
    payload: roomMessageUserYorozuId,
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
