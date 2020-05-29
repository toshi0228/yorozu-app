import axios from 'axios'
import host from '../constants/url'

// jwtのトークンを取ってくる データベースにないemail.passwordを送ったらトークンは帰ってこない
export const postSignIn = (params) => {
  return axios.post(`${host.localhost()}/api/auth/jwt/create`, params)
}

// トークン検証  トークンを送信して、dajngo側でそのトークンに当てはまるアカウントがあるかチェックしてくれる
export const postTokenVerify = (token) => {
  return axios.post(`${host.localhost()}/api/auth/jwt/verify`, { token: token.access })
}

// アカウントを作成
export const postSignUp = (params) => {
  return axios.post(`${host.localhost()}/api/account/`, params)
}
