import { getMySentReview, patchReview, getReviewScore } from '../../services/ApiRequest'
import {
  READ_MY_SENT_REVIEW,
  PATCH_REVIEW_EVENT,
  CHECK_MY_SENT_REVIEW_EVENT,
  READ_REVIEW_SCORE_EVENT,
  CHANGE_REVIEW_SCORE_EVENT,
} from '../actionTypes'

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
// プランページに移動した時に、万屋のreviewScoreを取得する
// =====================================================================================

export const fetchReviewScore = (yorozuId) => (dispatch) => {
  getReviewScore(yorozuId).then((res) => {
    dispatch(reviewScore(res))
  })
}

export const reviewScore = (reviewScoreData) => {
  return {
    type: READ_REVIEW_SCORE_EVENT,
    payload: reviewScoreData,
  }
}

// =====================================================================================
// 契約したことがある人がレビューして点数を変更する
// =====================================================================================
export const changeReviewScore = (num) => {
  return {
    type: CHANGE_REVIEW_SCORE_EVENT,
    payload: num,
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
export const checkMySentReview = (yorozuIdInfo) => {
  return {
    type: CHECK_MY_SENT_REVIEW_EVENT,
    payload: yorozuIdInfo,
  }
}
