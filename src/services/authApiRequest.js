import axios from 'axios';

// jwtのトークンを取ってくる
export const postSignIn = params => {
  return axios.post('http://127.0.0.1:8000/api/auth/jwt/create', params);
};

export const postSignUp = params => {
  return axios.post('http://127.0.0.1:8000/account/register/', params);
};

// http://127.0.0.1:8000/account/register/

// export const postSignUp = params => {
//   delete axios.defaults.headers.common['Authorization']
//   return axios.post(`${AUTH_API_ROOT}/sign_up`, params)
// }
