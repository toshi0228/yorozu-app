import { SIGN_IN_ACCOUNT, SIGN_OUT, READ_LOGIN_USER_PROFILE_EVENT } from '../actionTypes'
// import Account from '../../models/account';

export const DEFAULT_STATE = {
  authToken: '',
  yorozuId: '',
  isLoggedIn: false,
  // ...new Account({}),
}

const accountReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ============================================================================
    // ログインした時の処理
    // ============================================================================
    case SIGN_IN_ACCOUNT:
      return { ...state, ...action.payload }

    // ============================================================================
    // ログインした時に,プロフィールを取得する
    // ============================================================================
    case READ_LOGIN_USER_PROFILE_EVENT:
      console.log('READ_LOGIN_USER_PROFILE_EVENT')
      console.log(action.payload)

      // todo プロフィールをうまく処理

      return state

    // ============================================================================
    // アカウントの新規登録の時の処理
    // ============================================================================
    case 'CREATE_ACCOUNT':
      return { ...state, ...action.res }

    // ============================================================================
    // ログアウトした時の処理
    // ============================================================================
    case SIGN_OUT:
      return DEFAULT_STATE

    default:
      return state
  }
}

export default accountReducer
