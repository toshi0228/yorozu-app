import {
  SIGN_IN_ACCOUNT,
  SIGN_OUT,
  READ_LOGIN_USER_PROFILE_EVENT,
  FAILURE_SIGIN_IN_EVENT,
  FAILURE_SIGIN_UP_EVENT,
  RESET_ERROR_MESSAGE_EVENT,
} from '../actionTypes'
// import Account from '../../models/account';

export const DEFAULT_STATE = {
  authToken: '',
  yorozuId: '',
  isLoggedIn: false,
  isSignInFailure: false,
  isSignUpFailure: false,
  //// ユーザーイメージを取得しているかどうかと、 ログインユーザーの画像
  userImage: { isUserImage: false, image: '' },
}

const accountReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ============================================================================
    // ログインした時の処理
    // ============================================================================
    case SIGN_IN_ACCOUNT:
      return { ...state, ...action.payload }

    // ============================================================================
    // ログインした時に失敗した時の処理
    // ============================================================================
    case FAILURE_SIGIN_IN_EVENT:
      return { ...state, isSignInFailure: true }

    // ============================================================================
    // ログインした時に,プロフィールを取得する
    // ============================================================================
    case READ_LOGIN_USER_PROFILE_EVENT:
      const profileImage = action.payload.data['profileImage']
      if (profileImage) {
        return { ...state, userImage: { isUserImage: true, image: profileImage } }
      }
      return state

    // ============================================================================
    // アカウントの新規登録の時の処理
    // ============================================================================
    case 'CREATE_ACCOUNT':
      return { ...state, ...action.res }

    // ============================================================================
    // 新規登録した時に失敗した場合の処理
    // ============================================================================
    case FAILURE_SIGIN_UP_EVENT:
      console.log('FAILURE_SIGIN_UP_EVENT')
      return { ...state, isSignUpFailure: true }

    // ============================================================================
    // ログアウトした時の処理
    // ============================================================================
    case SIGN_OUT:
      return DEFAULT_STATE

    // ============================================================================
    // ページ遷移した時にエラーメッセージを消すために、isSignInFailure: falseにする
    // ============================================================================
    case RESET_ERROR_MESSAGE_EVENT:
      console.log('RESET_ERROR_MESSAGE_EVENT')
      return { ...state, isSignInFailure: false, isSignUpFailure: false }

    default:
      return state
  }
}

export default accountReducer
