import { getMessageList, getSendMessageList, postMessage } from '../../services/ApiRequest'
import { READ_MESSAGE_EVENTS, READ_ROOMMESSAGE_EVENTS, READ_MY_SEND_MESSAGE_EVENTS } from '../actionTypes'

// =================================================================================
//自分あてに送られたメッセージを取得する
// =================================================================================
export const feachMessageList = (authToken) => (dispatch) => {
  getMessageList(authToken).then((messageListData) => {
    dispatch(readMessageList(messageListData))
  })
}
// =================================================================================
//自分あてに送られたメッセージを取得した後のアクションクリエータ
// =================================================================================
export const readMessageList = (fetchMessageListData) => {
  return {
    type: READ_MESSAGE_EVENTS,
    payload: fetchMessageListData,
  }
}

// =================================================================================
// 自分が送信したメッセージを取得する
// =================================================================================
export const feachSendMessageList = (authToken) => (dispatch) => {
  getSendMessageList(authToken).then((MysendMessageList) => {
    dispatch(readMySendMessageList(MysendMessageList))
  })
}

// =================================================================================
// 自分が送信したメッセージを取得した後のアクションクリエーター
// =================================================================================

export const readMySendMessageList = (MysendMessageList) => {
  return {
    type: READ_MY_SEND_MESSAGE_EVENTS,
    payload: MysendMessageList,
  }
}

// =================================================================================
// メッセージルームのメッセージを読むときのアクションクリエーター
// =================================================================================
export const readRoomMessage = (senderYorzuId) => {
  return {
    type: READ_ROOMMESSAGE_EVENTS,
    payload: senderYorzuId,
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
