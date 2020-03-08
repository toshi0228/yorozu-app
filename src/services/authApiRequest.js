import axios from 'axios';

export const postSignIn = params => {
  return axios.post('http://localhost:8080/sign_in', params);
};
