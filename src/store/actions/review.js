import { getMySentReview, patchReview } from '../../services/ApiRequest'
import { READ_MY_SENT_REVIEW, PATCH_REVIEW_EVENT, CHECK_MY_SENT_REVIEW_EVENT } from '../actionTypes'

// =====================================================================================
// 自分が送信したレビューを取得する
// =====================================================================================
export const readMysentReview = (authToken) => (dispatch) => {
  getMySentReview(authToken).then((res) => {
    dispatch(mySentReview(res))
  })
}

export const mySentReview = (mySentReview) => {
  return {
    type: READ_MY_SENT_REVIEW,
    payload: mySentReview,
  }
}

// =====================================================================================
// reviewの送信 or 上書き処理
// =====================================================================================
export const patchReviewEvent = (review) => (dispatch) => {
  patchReview(review).then((res) => {
    dispatch(changeReviewInfo(res))
  })
}

export const changeReviewInfo = (newReviewInfo) => {
  return {
    type: PATCH_REVIEW_EVENT,
    payload: newReviewInfo,
  }
}

// =====================================================================================
// プランページに移動した時に、自分が送ったreviewを確認する
// =====================================================================================
// idはloginUsetとplanownerのYorozuIDのオブジェクト
export const checkMySentReview = (planOwnerYorozuId) => {
  return {
    type: CHECK_MY_SENT_REVIEW_EVENT,
    payload: planOwnerYorozuId,
  }
}
