import axios from 'axios';

export const setAuthHeader = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + authToken.access;
};

export const feachTags = () => {
  return axios.get('http://127.0.0.1:8000/api/tag/');
};

export const postPlan = (planContent) => {
  console.log('API通信');
  console.log(planContent.image[0]);
  console.log(JSON.stringify(planContent));
  const formData = new FormData();
  formData.append('image', planContent.image);

  const res = axios
    .post('http://127.0.0.1:8000/api/entry', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res);
    });
};

// const res = axios.post('http://127.0.0.1:8000/api/plan/', planContent);
// const res = axios.post('http://127.0.0.1:8000/api/plan/entry/', planContent);

// export const postSignUp = params => {
//   return axios.post('http://127.0.0.1:8000/account/register/', params);
// };

//   // APIリクエストであると明示するために、接頭辞にリクエストのタイプを付ける
//   // Account
//   export const getMyAccount = () => axios.get(`${API_ROOT}/accounts/me`)
//   export const patchMyAccount = params => axios.patch(`${API_ROOT}/accounts/me`, params)
