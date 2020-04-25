import axios from 'axios';
import _ from 'lodash';

export const setAuthHeader = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + authToken.access;
};

export const feachTags = () => {
  return axios.get('http://127.0.0.1:8000/api/tag/');
};

export const postPlan = (params) => {
  console.log('API通信');
  console.log(params);

  const formData = new FormData();

  // =====================================================================================
  // ロダッシュは、オブジェクトの場合、第一引数にvalueが入る
  // =====================================================================================
  // params = {
  //   title:"タイトル",
  //   tags:["インスターグラマー"]
  // }

  // _.forEach(params, (value, key) => {
  //   console.log(value);
  //   console.log(Array.isArray(value));
  //   // 配列なのか判断する
  //   if (Array.isArray(value)) {
  //     // ex) value :["記念日", "インスターグラマー"]
  //     value.forEach((arrayElement) => {
  //       // tags[] インスターグラマー
  //       console.log(key + '[]', arrayElement);
  //       // formData.append(key + '[]', arrayElement);
  //       formData.append(key + '[]', arrayElement);
  //     });
  //   }
  // });

  // _.forEach(sendParams, (value, key) => {
  //   if (Array.isArray(value)) {
  //     _.forEach(value, (v, _) => {
  //       formData.append(key + '[]', v);
  //     });
  //   } else {
  //     formData.append(key, value);
  //   }
  // });

  // =====================================================================================
  // サーバーサイドのシリアライザと同じ名前にしないといけない
  // 第3引数は、Content-Dispositionヘッダに含めるファイル名を渡すことができる
  // =====================================================================================
  formData.append('title', params.title);
  formData.append('description', params.description);
  formData.append('price', params.price);
  formData.append('image', params.image[0], params.image[0].name);
  formData.append('tag', params.tags);
  formData.append('profileDescription', 'プロフィール説明');
  // "tags": [{"name":"try1"}]
  console.log(...formData.entries());

  axios
    .post('http://127.0.0.1:8000/api/entry', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

// 'http://127.0.0.1:8000/api/entry
// const res = axios.post('http://127.0.0.1:8000/api/plan/', planContent);
// const res = axios.post('http://127.0.0.1:8000/api/entry', planContent);

// export const postSignUp = params => {
//   return axios.post('http://127.0.0.1:8000/account/register/', params);
// };

//   // APIリクエストであると明示するために、接頭辞にリクエストのタイプを付ける
//   // Account
//   export const getMyAccount = () => axios.get(`${API_ROOT}/accounts/me`)
//   export const patchMyAccount = params => axios.patch(`${API_ROOT}/accounts/me`, params)
