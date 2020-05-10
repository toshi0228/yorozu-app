import { postMessage } from '../../services/ApiRequest';

export const sendMessage = (messageData) => (dispatch) => {
  console.log(`メッセージ内容:${messageData}`);
  postMessage(messageData).then((res) => {
    console.log(res);
  });
};
