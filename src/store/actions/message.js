import { getMessageList, getSendMessageList, postMessage, patchMessage } from '../../services/ApiRequest'
import {
  READ_MESSAGE_EVENTS,
  READ_ROOMMESSAGE_EVENTS,
  READ_MY_SEND_MESSAGE_EVENTS,
  SEND_MESSAGE_EVENT,
  READ_MESSAGE_ROOM_USER_YOROZUID_EVENT,
} from '../actionTypes'

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
// /message/rooms/●●●/のパスに来た時に、この●●●のyorozuIdを取得する
// =================================================================================

export const readMessageRoomUserYorozuId = (yorozuId) => {
  return {
    type: READ_MESSAGE_ROOM_USER_YOROZUID_EVENT,
    payload: yorozuId,
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
// メッセージルームのメッセージを呼び出すときのアクションクリエーター
// (roomUserYorozuId == senderYorzuId(メール送信者))
// =================================================================================
export const readRoomMessage = (roomUserYorozuId) => {
  return {
    type: READ_ROOMMESSAGE_EVENTS,
    payload: roomUserYorozuId,
  }
}

// =================================================================================
// メッセージを送信する (メッセージ送信は、planページからと、メッセージルームページでの2通りある)
// =================================================================================
export const sendMessage = (messageData) => (dispatch) => {
  postMessage(messageData)
    .then((res) => {
      //res.dataの中 ->{senderYorozuId: "aaa", receiverYorozuId: "jaian", messageContent: "新しいメッセージを送信" …}
      dispatch(sendMessageLoginUser(res.data))
      // 以下の処理は、メッセージルームからメッセージした時に役立つ処理
      dispatch(readRoomMessage(res.data.receiverYorozuId))
    })
    .catch((error) => {
      console.log(error)
    })
}

// =================================================================================
// メッセージを送信した時のアクションクリエーター (メッセージルームからメッセージした時に使う処理)
// =================================================================================
export const sendMessageLoginUser = (sendMessageData) => ({
  type: SEND_MESSAGE_EVENT,
  payload: sendMessageData,
})

// =================================================================================
// メッセージを未読から既読にする
// =================================================================================

export const alreadyRead = (message) => (dispatch) => {
  // createAtがreactで加工されたデータで、そのまま送るとエラーになるので、idと上書きするunread:falseだけにする
  const _message = { id: message['id'], unread: false }
  patchMessage(_message)
}
