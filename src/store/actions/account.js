import {
  SIGN_IN_ACCOUNT,
  SIGN_OUT,
  READ_LOGIN_USER_PROFILE_EVENT,
  FAILURE_SIGIN_IN_EVENT,
  FAILURE_SIGIN_UP_EVENT,
  RESET_ERROR_MESSAGE_EVENT,
  READ_YOROZUID_EVENT,
} from '../actionTypes'
import { push } from 'connected-react-router'
import { postSignIn, postSignUp, postTokenVerify, checkAccountId } from '../../services/authApiRequest'
import { setAuthHeader, getYorozuId, getLoginUserProfile } from '../../services/ApiRequest'
import jwt from 'jwt-decode'
import routes from '../../routes'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// token検証 データベースにあるアカウントか確認
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

export const tokenVerify = (token) => (dispatch) => {
  // トークンの検証に失敗したら,ログアウトさせる
  postTokenVerify(token).catch(() => {
    console.log('トークン切れコード')
    dispatch(signOut())
  })
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ログイン処理
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const signIn = (formProps) => (dispatch) => {
  // postSignInでJWTを受け取るため,サーバーと通信する
  // データベースにないアカウントなら、失敗する。うまくいけば、JWTが帰ってくる
  return postSignIn(formProps)
    .then((token) => {
      // ログインしたあとは、全てHTPPリクエストした時に、headerにトークンがセットしてあるようにするため、
      // このタイミングで、headerをセットする
      setAuthHeader(token.data)

      // dajngo rest framework からは{regresh:"",access:""}という形でjwtが返ってくる
      const decodeJwt = jwt(token.data.access)

      // jwtをデコードしたあと、ユーザーIDを取り出す
      const accoutId = decodeJwt.user_id

      // よろずIDを取得するため。サーバーと通信
      // ユーザーIDで情報管理すれば、便利かもしれないが、yorozuIdでprofile情報などを管理する
      getYorozuId(accoutId).then((yorozuId) => {
        // accountReducerにセットする
        dispatch(
          signInAccount({
            authToken: { ...token.data },
            yorozuId: yorozuId.data,
          })
        )

        // 取得したyorozuIdからログインユーザーのプロフィールを取得する
        getLoginUserProfile(yorozuId.data).then((res) => {
          dispatch(loginUserProfile(res))
        })
      })

      dispatch(push(routes.top()))
    })
    .catch((e) => {
      console.log(`${e} ログイン失敗`)
      dispatch(failureSiginIn(e))
    })
}

// ログインのアクションクリエーター
const signInAccount = (user) => {
  return {
    type: SIGN_IN_ACCOUNT,
    payload: { ...user, isLoggedIn: true },
  }
}

// ログインユーザーのプロフィールを取得した後の、アクションクリエータ
const loginUserProfile = (profile) => {
  return {
    type: READ_LOGIN_USER_PROFILE_EVENT,
    payload: profile,
  }
}

const failureSiginIn = (error) => {
  return {
    type: FAILURE_SIGIN_IN_EVENT,
    payload: error,
  }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// サインアウトの処理
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: { isLoggedIn: false },
  }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 新規登録処理
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const signUp = (formProps) => (dispatch) => {
  // 新規登録を行う
  postSignUp(formProps)
    .then((res) => {
      // 新規登録が完了したら、アクセストークンをもらいにいく
      postSignIn(formProps).then((res) => {
        // リクエストをするときにアクセストークンをヘッダーにセットする
        setAuthHeader(res.data)
        // accountReducerにトークンをセットする
        dispatch(signInAccount({ authToken: { ...res.data } }))
        dispatch(push(routes.myPage()))
      })
    })
    .catch((e) => {
      dispatch(failureSiginUp(e))
    })
}

// 新規登録が失敗し時の処理
export const failureSiginUp = (error) => {
  return {
    type: FAILURE_SIGIN_UP_EVENT,
    payload: error,
  }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ログインや新規登録で失敗した時に、エラーメッセージを消す処理
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// RESET_ERROR_MESSAGE_EVENT
export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE_EVENT,
  }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ログインユーザーのプロフィールを取得する
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const fetchLoginUserImage = (yorozuId) => (dispatch) => {
  getLoginUserProfile(yorozuId).then((res) => {
    dispatch(loginUserProfile(res))
  })
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろずIDを取得する
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

export const fetchYorozuId = (authToken) => (dispatch) => {
  checkAccountId(authToken).then((res) => {
    // api側モデル側で、accountIdとyoroziIdは、リレーションされている
    const accountId = res.data['id']
    getYorozuId(accountId)
      .then((res) => {
        dispatch(readYorozuId(res))
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

export const readYorozuId = (yorozuId) => {
  return {
    type: READ_YOROZUID_EVENT,
    payload: yorozuId,
  }
}

// =====================================================================================
// redux thunkが必要な処理
// 非同期の場合は、アクションではなく、関数を返す つまり内側の処理が終わった値を返す。
// =====================================================================================

// =====================================================================================
// jwtをデコードするためには、以下のものをimportする
// import jwt from 'jwt-decode';
// jwt(token)で,jwtの中身がデコードされる
// =====================================================================================
