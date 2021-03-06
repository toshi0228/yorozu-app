import {
  READ_MESSAGE_EVENTS,
  READ_ROOMMESSAGE_EVENTS,
  SEND_MESSAGE_EVENT,
  READ_MY_SEND_MESSAGE_EVENTS,
  READ_MESSAGE_ROOM_USER_YOROZUID_EVENT,
  READ_TOPPAGE_MESSAGE_LIST_EVENT,
} from '../actionTypes'
import _ from 'lodash'

// メッセージのトップページ用に、ユーザーが送信、受信したメッセージを並び替える
import { sortMessage } from '../../lib/message/sortMessage'
// トークルームのメッセージを並び替える
import { sortTalkRoomMessage } from '../../lib/message/sortTalkRoomMessage'

const DEFAULT_STATE = {
  // 受信したメッセージ データを加工するのでrowDataを残す
  rowDataRecieveMessage: [],
  // 受信したメッセージを取得したらtrue
  isloadedRecieveMessage: false,

  // 送信したメッセージ
  rowDataSenderMessage: [],
  // 送信したメッセージを取得したらtrue
  isloadedSenderMessage: false,

  // メッセージテーブルのページで表示させるトークルームリスト
  messageTableList: [],

  // トークルームに移動した時に使うリスト
  roomMessage: [],

  senderProfileImage: '',
  // MessageRoomUser -> 誰に送信するか
  messageRoomUser: '',
  // メッセージルームのyorozuId
  roomUserYorozuId: '',
}

// rowDataRecieveMessage、rowDataSenderMessageは、メッセージルームのページを開く時、
// 送信したメールと、受信したメールをミックスして、送信時間ごとにリストするため、時間を加工していないデータを残しておく。

const messageReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ==========================================================
    // 自分宛に届いたメッセージを取得した時の処理
    // ==========================================================
    case READ_MESSAGE_EVENTS:
      const recieveMessageList = action.payload.data

      return { ...state, rowDataRecieveMessage: recieveMessageList, isloadedRecieveMessage: true }

    // ==========================================================
    // /message/rooms/●●●/のパスに来た時に、この●●●のyorozuIdを取得する
    // ==========================================================
    case READ_MESSAGE_ROOM_USER_YOROZUID_EVENT:
      return { ...state, roomUserYorozuId: action.payload }

    // ==========================================================
    // ルームページ(トークルーム)ごとに、メッセージを呼び出すときの処理
    // ==========================================================
    case READ_ROOMMESSAGE_EVENTS:
      // // 未加工のデータを残しておく(ルームメッセージの時に、日にちのソートで使うため)
      const _rowDataRecieveMessage = _.cloneDeep(state.rowDataRecieveMessage)
      const _rowDataSenderMessage = _.cloneDeep(state.rowDataSenderMessage)

      // メッセージルームID(urlの一番最後(yozozo))は、送信者のyozozuIDでaction.payloadには、
      // 送信者のyozozuIDが入っている ex) http://localhost:3000/message/rooms/yozozo
      const yorozuId = action.payload

      // const talkRoomInfo = sortTalkRoomMessage(state.rowDataRecieveMessage, state.rowDataSenderMessage, action.payload)
      const talkRoomInfo = sortTalkRoomMessage(_rowDataRecieveMessage, _rowDataSenderMessage, yorozuId)

      // sortTalkRoomMessage()でreturn されるもの
      // const talkRoomInfo = {
      //   messageList: [],
      //   userNickname: [],
      //   yorozuId: [],
      // }

      return {
        ...state,
        roomMessage: talkRoomInfo['messageList'],
        messageRoomUser: talkRoomInfo['userNickname'],
        roomUserYorozuId: talkRoomInfo['yorozuId'],
      }

    // ==========================================================
    // 自分が送信したメッセージリストを取得した時の処理
    // ==========================================================
    case READ_MY_SEND_MESSAGE_EVENTS:
      const sentMessagelist = action.payload.data

      // 自分でメッセージを送信していない時の処理 (#action.payload.data[0].senderProfile.profileImageでエラーになる)
      if (sentMessagelist.length === 0) {
        return { ...state, senderMessage: sentMessagelist, senderProfileImage: '', isloadedSenderMessage: true }
      }

      const senderProfileImage = sentMessagelist[0].senderProfile.profileImage
      return {
        ...state,
        rowDataSenderMessage: sentMessagelist,
        senderProfileImage: senderProfileImage,
        isloadedSenderMessage: true,
      }

    // ==========================================================
    // 送信したメッセージと受信したメッセージを読み込み終わった時に行う処理
    // メッセージのトップページで、送信したメッセージと受信したメッセージ一覧を表示させるためのアクション
    // ==========================================================
    case READ_TOPPAGE_MESSAGE_LIST_EVENT:
      // 送信したメッセージと受信したメッセージを最新順にソートしてくれる
      const messageTableList = sortMessage(state.rowDataRecieveMessage, state.rowDataSenderMessage)

      // isloadedSenderMessageとisloadedRecieveMessageをfalseしないと永遠に取得するので、falseにする
      return { ...state, messageTableList: messageTableList, isloadedSenderMessage: false, isloadedRecieveMessage: false }

    // ==========================================================
    // メッセージの送信をしたときの処理
    // ==========================================================
    case SEND_MESSAGE_EVENT:
      // action.payloadには、自分が送信した新しいメッセージが入っているので、既存のデータに追加する
      state.rowDataSenderMessage.push(action.payload)
      return state
    default:
      return state
  }
}

export default messageReducer

// ===================================================================================
// 忘れそうなこと rowDataを作って理由 2020 6/2
// rowDataRecieveMessage: [],
// senderMessage: [],
// 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23
// 上記のような作成日を加工すると、"2020年10月23"のような形になり、
// このデータを使いまわすとき、メッセージルームページでソートできないので
// const rowDataRecieveMessage = _.cloneDeep(action.payload.data)のような形で
// rowDataを作っておく。
// ===================================================================================
