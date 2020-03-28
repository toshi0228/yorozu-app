import axios from 'axios';

export const setAuthHeader = authToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + authToken.access;
};

//   // APIリクエストであると明示するために、接頭辞にリクエストのタイプを付ける
//   // Account
//   export const getMyAccount = () => axios.get(`${API_ROOT}/accounts/me`)
//   export const patchMyAccount = params => axios.patch(`${API_ROOT}/accounts/me`, params)
