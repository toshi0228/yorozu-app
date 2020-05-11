import axios from 'axios';

export const setAuthHeader = (authToken) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + authToken.access;
};

// ログインを行った時に、yorozuIDを取得にいく
export const getYorozuId = (userId) => {
  // console.log(axios.get(`http://127.0.0.1:8000/api/account/${userId}`));
  return axios.get(`http://127.0.0.1:8000/api/account/${userId}`);
};

// トップページ 万屋プロフィールリストの取得
export const getProfileList = () => {
  return axios.get('http://127.0.0.1:8000/api/profile/');
};

// 万屋、詳細ページの取得
export const getProfileDetail = (id) => {
  return axios.get(`http://127.0.0.1:8000/api/profile/${id}`);
};

export const feachTags = () => {
  return axios.get('http://127.0.0.1:8000/api/tag/');
};

export const postMessage = (messageContent) => {
  console.log(axios.post('http://127.0.0.1:8000/api/message/', messageContent));
  return axios.post('http://127.0.0.1:8000/api/message/', messageContent);
};

// プラン登録
export const postPlan = (params) => {
  const formData = new FormData();

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
