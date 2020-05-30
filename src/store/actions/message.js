import { getMessageList, postMessage } from '../../services/ApiRequest'
import { READ_MESSAGE_EVENTS } from '../actionTypes'

// メッセージデータをリクエストする
export const feachMessageList = (authToken) => (dispatch) => {
  getMessageList(authToken).then((messageListData) => {
    dispatch(readMessageList(messageListData))
  })
}

// メッセージのアクションクリエーター
export const readMessageList = (fetchMessageListData) => {
  return {
    type: READ_MESSAGE_EVENTS,
    payload: fetchMessageListData,
  }
}

export const sendMessage = (messageData) => (dispatch) => {
  console.log(`メッセージ内容:${messageData}`)
  postMessage(messageData)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}
