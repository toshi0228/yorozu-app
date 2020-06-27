import {
  READ_PROFILE_EVENTS,
  READ_PROFILE_DETAIL_EVENT,
  PROFILE_DETAIL_INITIALIZE_EVENT,
  READ_ACCOUNT_ID_EVENT,
  SEARCH_PROFILE_EVENT,
  PROFILE_RRESET_EVENT,
} from '../actionTypes'
import { getProfileList, postProfile, getProfileDetail, postSerach } from '../../services/ApiRequest'
import { checkAccountId } from '../../services/authApiRequest'
import { push } from 'connected-react-router'
import routes from '../../routes/index'

// import { push } from 'connected-react-router'

// =====================================================================================
// プロフィールリストの読み込み(トップページでの処理)
// =====================================================================================
export const fetchProfileList = () => (dispatch) => {
  getProfileList().then((res) => {
    dispatch(readProfileList(res.data))
  })
}

// =====================================================================================
// プロフィールのアクションクリエーター
// =====================================================================================
export const readProfileList = (fetchProfileListData) => {
  return {
    type: READ_PROFILE_EVENTS,
    payload: fetchProfileListData,
  }
}

// =====================================================================================
// 万屋の詳細ページのhttpリクエスト;
// =====================================================================================
export const feachProfileDetail = (id) => (dispatch) => {
  return getProfileDetail(id).then((res) => {
    dispatch(readProfile(res.data))
  })
}
// =====================================================================================
// 万屋の詳細ページのアクション
// =====================================================================================
export const readProfile = (fetchProfileData) => {
  return {
    type: READ_PROFILE_DETAIL_EVENT,
    payload: fetchProfileData,
  }
}

// =====================================================================================
// プランページに移動した時に、前のプランプロフィールデータやプランデータが残っている可能性があるので
// プランリストページに移動したら初期化する
// =====================================================================================
export const profileDetailInitialize = () => {
  return {
    type: PROFILE_DETAIL_INITIALIZE_EVENT,
  }
}

// =====================================================================================
// アカウントIDを調べる
// =====================================================================================
export const feachAccountId = (authtoken) => (dispatch) => {
  checkAccountId(authtoken).then((account) => {
    dispatch(readAccountId(account.data.id))
  })
}

export const readAccountId = (accountId) => {
  return {
    type: READ_ACCOUNT_ID_EVENT,
    payload: accountId,
  }
}
// =====================================================================================
// よろず屋(profile)の検索
// =====================================================================================
export const search = (keyword) => (dispatch) => {
  // 検索した後のページを表示する前に、今あるデータをリセットする
  // dispatch(profileListReset())
  postSerach(keyword).then((res) => {
    console.log(res)
    dispatch(searchProfile(res))
    dispatch(push(routes.top()))
  })
}

// profileのトップページ以外で、ページ遷移をした場合に、前のデータが残っているので最初にデータリセットする
export const profileListReset = () => {
  return {
    type: PROFILE_RRESET_EVENT,
  }
}

export const searchProfile = (searchResult) => {
  return {
    type: SEARCH_PROFILE_EVENT,
    payload: searchResult,
  }
}

// =====================================================================================
// プロフィールの作成
// =====================================================================================
export const createProfile = (profile) => (dispatch) => {
  // 画像を送信する時は、「Content-Type: multipart/form-data」をheaderにつけるので,
  // formオブジェクトを作成しないといけない
  const formData = new FormData()
  formData.append('accountId', profile.accountId)
  formData.append('nickname', profile.nickname)
  formData.append('yorozuyaName', profile.yorozuyaName)
  formData.append('yorozuId', profile.yorozuId)
  // 省略可能な第3引数を使用して、Content-Dispositionヘッダに含めるファイル名を渡すことができる
  formData.append('profileImage', profile.profileImage[0], profile.profileImage[0].name)
  formData.append('profileDescription', profile.profileDescription)
  formData.append('planThumbnailImage', profile.planThumbnailImage[0], profile.planThumbnailImage[0].name)
  // formData.append('twitterAccount', profile.twitterAccount)
  // formData.append('facebookAccount', profile.facebookAccount)
  // formData.append('instagramAccount', profile.instagramAccount)

  postProfile(formData).then((res) => {
    console.log(res)
  })
}

// =====================================================================================
// 2020 4 28
// conast foo = () => (dispatch){
//     return bar
// }

// midlwareを設定するとdispatchは、midlwareに向かうが中身は
// const thunk = (store) => (next) => action =>{
//     if (typeof action === 'function'){
//         return action(store.dispatch, store.getState)
//     }
// }

// container側でディスパッチを行なっても関数が返ってくるので,dispatchを受けとることができる
// dispatch(feachProfile())

// =====================================================================================
