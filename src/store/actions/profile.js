import {
  READ_PROFILE_EVENTS,
  READ_PROFILE_DETAIL_EVENT,
  PROFILE_DETAIL_INITIALIZE_EVENT,
  READ_ACCOUNT_ID_EVENT,
  SEARCH_PROFILE_EVENT,
  RESET_PROFILE_LIST_EVENT,
  READ_PROFILE_ITEM_EVENT,
  UPDATE_PROFILE_EVENT,
  FIN_UPDATE_PROFILE_EVENT,
  CHECK_INPUT_ITEM_EVENT,
  FIN_REGISTER_PROFILE_EVENT,
  // CREATE_PROFILE_EVENT,
} from '../actionTypes'
import { getProfileList, postProfile, getProfileDetail, postSerach, patchProfile } from '../../services/ApiRequest'
import { checkAccountId } from '../../services/authApiRequest'
import { push } from 'connected-react-router'
import routes from '../../routes/index'
import { readYorozuId } from './account'

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
// ロゴボタンを押したときに、profileのisLoadingをfalseにする
// =====================================================================================

export const resetProfileList = () => {
  return {
    type: RESET_PROFILE_LIST_EVENT,
  }
}

// =====================================================================================
// よろず屋(profile)の検索
// =====================================================================================
export const search = (keyword) => (dispatch) => {
  postSerach(keyword).then((res) => {
    dispatch(searchProfile(res))
    dispatch(push(routes.top()))
  })
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
  console.log('action createProfile')
  console.log(profile)
  console.log('----------------------')
  console.log(profile.profileImage)
  // console.log(profile.profileImage[0])
  // console.log(profile.profileImage[0].name)
  console.log('----------------------')

  // 画像を送信する時は、「Content-Type: multipart/form-data」をheaderにつけるので,
  // formオブジェクトを作成しないといけない
  const formData = new FormData()
  formData.append('accountId', profile.accountId)
  formData.append('nickname', profile.nickname)
  formData.append('yorozuyaName', profile.yorozuyaName)
  formData.append('yorozuId', profile.yorozuId)
  formData.append('profileDescription', profile.profileDescription)

  formData.append('profileImage', profile.profileImage[0])
  formData.append('yorozuyaThumbnailImage', profile.yorozuyaThumbnailImage[0])

  postProfile(formData).then((res) => {
    // プロフィールの登録完了  isToRegisterを true から false にする これをしないと何回も
    // createProfileを行うことになってしまうので、完了したことをreducerに伝える
    dispatch(finCreateProfile())

    // プロフィールを登録した後に、登録したprofileデータの詳細を取得する(プランデータやscoreデータも取得できる)
    const yorozuId = res.data.yorozuId
    getProfileDetail(yorozuId).then((res) => {
      dispatch(readProfile(res.data))
    })

    // プロフィールを登録した後、planの登録ボタンを押すためには、yorozuIdをaccountReucerで登録させないといけない
    // 引数に関しては、他で{ data: yorozuId }の形で渡しているので、その形に合わせる
    dispatch(readYorozuId({ data: yorozuId }))
  })
}

// =====================================================================================
// プロフィールの項目を読み込み
// =====================================================================================

export const readProfileItem = (profileData) => {
  return {
    type: READ_PROFILE_ITEM_EVENT,
    payload: profileData,
  }
}

// =====================================================================================
// プロフィールの更新処理
// =====================================================================================

export const updateProfile = (profile) => (dispatch) => {
  // 画像を送信する時は、「Content-Type: multipart/form-data」をheaderにつけるので,
  // formオブジェクトを作成しないといけない
  const formData = new FormData()
  formData.append('accountId', profile.accountId)
  formData.append('nickname', profile.nickname)
  formData.append('yorozuyaName', profile.yorozuyaName)
  formData.append('yorozuId', profile.yorozuId)
  formData.append('profileDescription', profile.profileDescription)

  // profile.profileImageの初期値は[]で、空なら何も処理をしない
  if (profile.profileImage.length !== 0) {
    // 省略可能な第3引数を使用して、Content-Dispositionヘッダに含めるファイル名を渡すことができる
    formData.append('profileImage', profile.profileImage[0], profile.profileImage[0].name)
  }

  // profile.profileImageの初期値は[]で、空なら何も処理をしない
  if (profile.yorozuyaThumbnailImage.length !== 0) {
    // 省略可能な第3引数を使用して、Content-Dispositionヘッダに含めるファイル名を渡すことができる
    formData.append('yorozuyaThumbnailImage', profile.yorozuyaThumbnailImage[0], profile.yorozuyaThumbnailImage[0].name)
  }

  const updateData = { formData, yorozuId: profile.yorozuId }
  // プロフィールを更新する処理
  patchProfile(updateData)
    .then((res) => {
      dispatch(newProfile(res))
    })
    .catch((error) => {
      dispatch(newProfile({ error }))
    })
}

export const newProfile = (profileData) => {
  return {
    type: UPDATE_PROFILE_EVENT,
    payload: profileData,
  }
}

// =====================================================================================
// プロフィールの登録完了  isToRegisterを true から false にする
// =====================================================================================

export const finCreateProfile = () => {
  return {
    type: FIN_REGISTER_PROFILE_EVENT,
  }
}

// =====================================================================================
// profileUpdateを終了 updateProfileをtrueからfalseにする
// =====================================================================================

export const finUpdateProfile = () => {
  return {
    type: FIN_UPDATE_PROFILE_EVENT,
  }
}

// =====================================================================================
// プロフィールの登録画面で空白のチェック
// =====================================================================================
export const checkInputItem = (InputItems) => {
  return {
    type: CHECK_INPUT_ITEM_EVENT,
    payload: InputItems,
  }
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
