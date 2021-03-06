import axios from 'axios'
import host from '../constants/url'

//=====================================================================================
// ヘッダーにトークンをつける
//=====================================================================================
export const setAuthHeader = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken.access
}

//=====================================================================================
// ログインを行った時に、yorozuIDを取得にいく
//=====================================================================================
export const getYorozuId = (accoutId) => {
  return axios.get(`${host.localhost()}/api/account/${accoutId}`)
}
//=====================================================================================
// ログインした時に、ログインユーザーのプロフィールを取得する
//=====================================================================================
export const getLoginUserProfile = (yorozuId) => {
  return axios.get(`${host.localhost()}/api/profile/${yorozuId}`)
}

//=====================================================================================
// トークンからメールアドレスの取得をする
//=====================================================================================
export const getMailAddress = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/auth/users/me/`)
}

//=====================================================================================
// トップページ 万屋プロフィールリストの取得
//=====================================================================================
export const getProfileList = () => {
  delete axios.defaults.headers.common['Authorization']
  return axios.get(`${host.localhost()}/api/profile/`)
}

//=====================================================================================
// よろず屋(profile)の検索
//=====================================================================================

export const postSerach = (keyword) => {
  delete axios.defaults.headers.common['Authorization']
  return axios.post(`${host.localhost()}/api/search/profile/`, keyword)
}

//=====================================================================================
// 万屋、詳細ページの取得
//=====================================================================================
export const getProfileDetail = (id) => {
  delete axios.defaults.headers.common['Authorization']
  return axios.get(`${host.localhost()}/api/profile/${id}`)
}

export const feachTags = () => {
  return axios.get(`${host.localhost()}/api/tag/`)
}

//=====================================================================================
//自分あてに送られたメッセージを取得する
//=====================================================================================
export const getMessageList = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/messagebox/`)
}

// =====================================================================================
// 自分が送信したメッセージを取得する
// =====================================================================================
export const getSendMessageList = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/message/`)
}

// =====================================================================================
// メッセージの送信
// =====================================================================================

export const postMessage = (messageContent) => {
  return axios.post(`${host.localhost()}/api/message/`, messageContent)
}

// =====================================================================================
// メッセージに関して、未読から既読に変更する
// =====================================================================================

export const patchMessage = (message) => {
  return axios.patch(`${host.localhost()}/api/message/`, message)
}

// =====================================================================================
// 自分宛に届いた、プランリクエスト一覧を取得する
// =====================================================================================
// export const getPlanRequestList = (authToken) => {
//   axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
//   return axios.get(`${host.localhost()}/api/request/`)
// }

//=====================================================================================
// プランを取得 プランを編集する時に使う
//=====================================================================================

export const getPlan = (planId) => {
  return axios.get(`${host.localhost()}/api/plan/${planId}`)
}

//=====================================================================================
// プラン登録
//=====================================================================================
export const postPlan = (plan) => {
  return axios.post(`${host.localhost()}/api/plan/`, plan, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}

//=====================================================================================
// プランの削除
//=====================================================================================
export const deletePlan = (planId) => {
  return axios.delete(`${host.localhost()}/api/plan/${planId}/`)
}

// =====================================================================================
// 自分が送信したプランリクエストの一覧を取得する
// =====================================================================================

// export const getMySentPlanRequestList = (authToken) => {
//   axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
//   return axios.get(`${host.localhost()}/api/request/me/`)
// }

// =====================================================================================
// プラン画面から、プランのリクエスト(仮契約)
// =====================================================================================
// export const postPlanRequest = (requestData) => {
//   return axios.post(`${host.localhost()}/api/request/`, requestData)
// }

// =====================================================================================
// お客さんからの、プランリクエストの承認処理(メッセージページでの処理)
// =====================================================================================
export const patchPlanApprovalStatus = (contractPlan) => {
  // プランリクエストユーザーのよろずIDと,承認状態をtrueにするため、isApproval: trueを送る
  return axios.patch(`${host.localhost()}/api/contract/`, {
    senderYorozuId: contractPlan.purchaser,
    contractPlan: contractPlan.contractPlanId,
    isApproval: true,
  })
}

//=====================================================================================
// プラン画面から、プラン契約のリクエスト(本契約)
//=====================================================================================
export const postPlanContract = (contractData) => {
  return axios.post(`${host.localhost()}/api/contract/`, contractData)
}

//=====================================================================================
// プランの更新を行う
//=====================================================================================

export const patchPlan = (planItem) => {
  return axios.patch(`${host.localhost()}/api/plan/${planItem['id']}/`, planItem)
}

//=====================================================================================
// プランの画像を更新を行う
//=====================================================================================

export const patchPlanImage = (imageData) => {
  return axios.patch(`${host.localhost()}/api/plan/${imageData['id']}/`, imageData.formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}

//=====================================================================================
// プランのタグを更新する
//=====================================================================================

export const patchPlanTag = (tagData) => {
  return axios.patch(`${host.localhost()}/api/plan/tag/${tagData['id']}/`, tagData.tag, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}

// !!配列の場合もmultipart/form-dataで送る
// プランの更新と渡しているものは同じだが、以下のurlにplanデータを渡せば、
// サーバー側ではtagしか更新されない

// =====================================================================================
// 自分が送信したプランの契約申請一覧を取得する
// =====================================================================================

export const getMySentPlanContractList = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/contract/me/`)
}

// =====================================================================================
// stripeの決済処理
// =====================================================================================
export const postPayment = (token) => {
  return axios.post(`${host.localhost()}/api/payment/`, token)
}

// =====================================================================================
// Stripeから発行されてた cutomerIdとpaymentMethodIdを取得する
// =====================================================================================
export const getPayment = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/payment/customer`)
}

// =====================================================================================
// stripeのカード情報の登録
// =====================================================================================
export const postPaymentCustomer = ({ id, email, paymentMethodId, authToken }) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken.access
  return axios.post(`${host.localhost()}/api/payment/customer`, { id, email, paymentMethodId })
}

export const patchCardInfo = ({ customerId, prevPaymentMethodId, nextPaymentMethodId }) => {
  return axios.patch(`${host.localhost()}/api/payment/customer`, { customerId, prevPaymentMethodId, nextPaymentMethodId })
}

// =====================================================================================
// 自分のプランを購入してくれた人のリスト
// =====================================================================================
export const getPurchasersList = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/contract/`)
}

//=====================================================================================
// profileを登録 (新規登録)
//=====================================================================================

export const postProfile = (profile) => {
  // delete axios.defaults.headers.common['Authorization']
  return axios.post(`${host.localhost()}/api/profile/`, profile, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}

//=====================================================================================
// profileのデータを更新する
//=====================================================================================
export const patchProfile = (updataData) => {
  return axios.patch(`${host.localhost()}/api/profile/${updataData.yorozuId}/`, updataData.formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}

//=====================================================================================
// 自分が送信したreviewを取得する
//=====================================================================================

export const getMySentReview = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/review/`)
}

//=====================================================================================
// プランページに移動した時に、万屋のreviewScoreを取得する
//=====================================================================================

export const getReviewScore = (yorozuId) => {
  delete axios.defaults.headers.common['Authorization']
  return axios.get(`${host.localhost()}/api/review/${yorozuId}`)
}

//=====================================================================================
// reviewを送信 or 上書きする
//=====================================================================================

export const patchReview = (reviewInfo) => {
  return axios.patch(`${host.localhost()}/api/review/`, reviewInfo)
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// formDataに関して 2020 6 21
// 画像を送信する時、headerに「Content-Type: multipart/form-data」をつけないと以下のようなえエラーが返ってくる
// profileImage: ["添付されたデータはファイルではありません。フォームのエンコーディングタイプを確認してください。"]
// なので、画像を使う時はheaderに「Content-Type: multipart/form-data」つけ、そしてFormData()を使わないといけない
// ちなみに、axiosは通常「Content-Type: application/json」でデータを送信している
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
