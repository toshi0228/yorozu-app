import { getPlanRequestList, patchPlanApprovalStatus } from '../../services/ApiRequest'
import { READ_PLAN_REQUEST_EVENTS, READ_ROOMMESSAGE_USER_PLAN_REQUEST_EVENT } from '../actionTypes'

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
export const patchPlanApproval = () => (dispatch) => {
  patchPlanApprovalStatus().then((res) => {
    console.log(res)
    // dispatch(readProfileList(res.data))
  })
}
