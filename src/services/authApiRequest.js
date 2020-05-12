import axios from 'axios'
import JwtDecode from 'jwt-decode'

// jwtのトークンを取ってくる データベースにないemail.passwordを送ったらトークンは帰ってこない
export const postSignIn = (params) => {
  return axios.post('http://127.0.0.1:8000/api/auth/jwt/create', params)
}

// トークン検証  トークンを送信して、dajngo側でそのトークンに当てはまるアカウントがあるかチェックしてくれる
export const postTokenVerify = (token) => {
  return axios.post('http://localhost:8000/api/auth/jwt/verify', { token: token.access })
}

// アカウントを作成
export const postSignUp = (params) => {
  return axios.post('http://localhost:8000/api/account/', params)
}
