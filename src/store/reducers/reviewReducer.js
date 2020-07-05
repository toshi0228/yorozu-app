import {
  READ_MY_SENT_REVIEW,
  PATCH_REVIEW_EVENT,
  CHECK_MY_SENT_REVIEW_EVENT,
  READ_REVIEW_SCORE_EVENT,
  CHANGE_REVIEW_SCORE_EVENT,
  PROFILE_DETAIL_INITIALIZE_EVENT,
} from '../actionTypes'

const DEFAULT_STATE = {
  // 最初にreviewに関してのデータをapでデータを取得したかどうか
  isLoading: false,
  // 自分が送信したreviewリスト
  mySentReview: [],
  // プランオーナーに送った自分のレビュー情報
  mySentReviewInfo: { isPositiveScore: false, isNegativeScore: false },
  // ログインユーザーのレビューの状況を確認 1,まだ送っていない 2,良い評価 3, 悪い評価
  reviewStatus: 'default',
  // レビューの点数
  score: { positiveScore: 0, negativeScore: 0 },
}

const reviewReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // =========================================================================================
    // プランページに移動した時に、profileDetailデータやreviewが残っている事があるので、
    // トップページに移動した時に初期化する
    // =========================================================================================
    case PROFILE_DETAIL_INITIALIZE_EVENT:
      return { ...state, score: { positiveScore: 0, negativeScore: 0 } }
    // =========================================================================================
    // 自分が送信したレビューを取得する
    // =========================================================================================
    case READ_MY_SENT_REVIEW:
      return { ...state, isLoading: true, mySentReview: action.payload.data }

    // =========================================================================================
    // よろずやの点数を取得する
    // =========================================================================================
    case READ_REVIEW_SCORE_EVENT:
      return { ...state, score: action.payload.data }

    // =========================================================================================
    // よろずやの点数を変更する
    // =========================================================================================
    case CHANGE_REVIEW_SCORE_EVENT:
      const _positiveScore = state.score['positiveScore'] + action.payload.positiveScore
      const _negativeScore = state.score['negativeScore'] + action.payload.negativeScore
      return { ...state, score: { positiveScore: _positiveScore, negativeScore: _negativeScore } }

    // =========================================================================================
    // プランページに移動したとき、そのplanOwnerに送ったreview情報を確認する
    // =========================================================================================
    case CHECK_MY_SENT_REVIEW_EVENT:
      // ログインユーザーがプランオーナーに送ったreviewを取得する
      const mySentReviewInfo = state.mySentReview.find((review) => {
        return review.receiverYorozuId === action.payload.ownerId && review.senderYorozuId === action.payload.loginUserId
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
