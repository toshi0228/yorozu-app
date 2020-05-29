import { getMessageList,postMessage } from '../../services/ApiRequest';


export const feachMessageList = (authToken) => (dispatch) =>{
  console.log("メッセージリストを読み込む")
  getMessageList(authToken).then((res)=>{
    console.log(res)
  })
}

export const sendMessage = (messageData) => (dispatch) => {
  console.log(`メッセージ内容:${messageData}`);
  postMessage(messageData).then((res) => {
    console.log(res);
  }).catch((error)=>{
    console.log(error)
  });
};
