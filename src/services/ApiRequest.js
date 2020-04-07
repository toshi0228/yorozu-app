import axios from 'axios';

export const setAuthHeader = authToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + authToken.access;
};

export const feachTags = () => {
  return axios.get('http://127.0.0.1:8000/api/tag/');
};

export const postPlan = planContent => {
  return axios.post('http://localhost:8080/create_plan', planContent);
};

//   // APIリクエストであると明示するために、接頭辞にリクエストのタイプを付ける
//   // Account
//   export const getMyAccount = () => axios.get(`${API_ROOT}/accounts/me`)
//   export const patchMyAccount = params => axios.patch(`${API_ROOT}/accounts/me`, params)
