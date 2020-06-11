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
  // console.log(axios.get(`http://127.0.0.1:8000/api/account/${userId}`));
  return axios.get(`${host.localhost()}/api/account/${accoutId}`)
}

//=====================================================================================
// トップページ 万屋プロフィールリストの取得
//=====================================================================================
export const getProfileList = () => {
  return axios.get(`${host.localhost()}/api/profile/`)
}

//=====================================================================================
// 万屋、詳細ページの取得
//=====================================================================================
export const getProfileDetail = (id) => {
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
// 自分宛に届いた、プランリクエスト一覧を取得する
// =====================================================================================
export const getPlanRequestList = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/request/`)
}

// =====================================================================================
// 自分が送信したプランリクエストの一覧を取得する
// =====================================================================================

export const getMyPlanRequestList = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + authToken
  return axios.get(`${host.localhost()}/api/request/me/`)
}

// =====================================================================================
// プラン画面から、プランのリクエスト
// =====================================================================================
export const postPlanRequest = (requestData) => {
  return axios.post(`${host.localhost()}/api/request/`, requestData)
}

// =====================================================================================
// お客さんからの、プランリクエストの承認処理
// =====================================================================================
export const patchPlanApprovalStatus = (planRequestUserYorozuId) => {
  // プランリクエストユーザーのよろずIDと,承認状態をtrueにするため、isApproval: trueを送る
  return axios.patch(`${host.localhost()}/api/request/`, { senderYorozuId: planRequestUserYorozuId, isApproval: true })
}
//=====================================================================================
// プラン登録
//=====================================================================================
export const postPlan = (params) => {
  const formData = new FormData()

  // =====================================================================================
  // サーバーサイドのシリアライザと同じ名前にしないといけない
  // 第3引数は、Content-Dispositionヘッダに含めるファイル名を渡すことができる
  // =====================================================================================
  formData.append('title', params.title)
  formData.append('description', params.description)
  formData.append('price', params.price)
  formData.append('image', params.image[0], params.image[0].name)
  formData.append('tag', params.tags)
  formData.append('profileDescription', 'プロフィール説明')
  // "tags": [{"name":"try1"}]
  console.log(...formData.entries())

  axios
    .post(`${host.localhost()}/api/entry`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}
