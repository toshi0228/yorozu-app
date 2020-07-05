import { READ_MY_SENT_REVIEW, SEND_REVIEW_EVENT, PATCH_REVIEW_EVENT, CHECK_MY_SENT_REVIEW_EVENT } from '../actionTypes'

const DEFAULT_STATE = {
  // 最初にreviewに関してのデータをapでデータを取得したかどうか
  isLoading: false,
  // 自分が送信したreviewリスト
  mySentReview: [],
  // プランオーナーに送った自分のレビュー情報
  mySentReviewInfo: { isPositiveScore: false, isNegativeScore: false },
  reviewStatus: 'default',
}

const reviewReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // =========================================================================================
    // 自分が送信したレビューを取得する
    // =========================================================================================
    case READ_MY_SENT_REVIEW:
      return { ...state, isLoading: true, mySentReview: action.payload.data }

    // =========================================================================================
    // プランページに移動したとき、そのplanOwnerに送ったreview情報を確認する
    // =========================================================================================
    case CHECK_MY_SENT_REVIEW_EVENT:
      const mySentReviewInfo = state.mySentReview.find((review) => {
        return review.receiverYorozuId === action.payload
      })

      // mySentReviewInfo => planOwnerにreviewを送ったことがあり、なおかつ良い評価を場合、悪い評価をした場合
      if (mySentReviewInfo) {
        if (mySentReviewInfo.isPositiveScore === true) {
          return { ...state, reviewStatus: 'positive' }
        } else if (mySentReviewInfo.isNegativeScore) {
          return { ...state, reviewStatus: 'negative' }
        } else {
          return { ...state, reviewStatus: 'default' }
        }
      }

      return state

    // =========================================================================================
    // reviewを投稿
    // =========================================================================================
    case PATCH_REVIEW_EVENT:
      const _isPositiveScore = action.payload.data.isPositiveScore
      const _isNegativeScore = action.payload.data.isNegativeScore

      // patchした場合は、再度データを取得し直すために、,isLoading: falseにしておく
      if (_isPositiveScore) {
        return { ...state, reviewStatus: 'positive', isLoading: false }
      } else if (_isNegativeScore) {
        return { ...state, reviewStatus: 'negative', isLoading: false }
      } else {
        return { ...state, reviewStatus: 'default', isLoading: false }
      }

    // =========================================================================================
    // デフォルトの場合
    // =========================================================================================
    default:
      return state
  }
}

export default reviewReducer
