import {
  READ_MESSAGE_EVENTS,
  READ_ROOMMESSAGE_EVENTS,
  SEND_MESSAGE_EVENT,
  READ_MY_SEND_MESSAGE_EVENTS,
  READ_MESSAGE_ROOM_USER_YOROZUID_EVENT,
  READ_TOPPAGE_MESSAGE_LIST_EVENT,
} from '../actionTypes'
import _ from 'lodash'

import { sortMessage } from '../../lib/message/sortMessage'

const DEFAULT_STATE = {
  // 受信したメッセージ データを加工するのでrowDataを残す
  recieveMessage: [],
  rowDataRecieveMessage: [],
  // 受信したメッセージを取得したらtrue
  isloadedRecieveMessage: false,

  // 送信したメッセージ
  senderMessage: [],
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
    // 自分宛に届いたメッセージ
    // ==========================================================
    case READ_MESSAGE_EVENTS:
      // 未加工のデータを残しておく(ルームメッセージの時に、日にちのソートで使う)
      const rowDataRecieveMessage = _.cloneDeep(action.payload.data)
      // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23
      const recieveMessageList = action.payload.data.map((message) => {
        message['createdAt'] = message.createdAt.split('T')[0]
        const time = message['createdAt'].split('-')
        message['createdAt'] = `${time[0]}年${time[1]}月${time[2]}`
        return message
      })

      // メッセージ作成タブの右サイドのユーザーリストを作成する
      const userList = _.map(recieveMessageList, (message) => {
        return message.senderProfile.nickname
      })

      // ユーザーリストから、重複をなくす ["のびた", "しずかちゃん", "のびた"] -> ["のびた", "しずかちゃん"]
      const _userList = _.union(userList)

      // ["のびた", "しずかちゃん"]から、ユーザーごとの最新のメッセージを取り出す
      const _recieveMessageList = []
      _userList.forEach((user) => {
        const newMessage = _.find(recieveMessageList, (message) => {
          return _.includes(message.senderProfile.nickname, user)
        })
        _recieveMessageList.push(newMessage)
      })

      return { ...state, recieveMessage: _recieveMessageList, rowDataRecieveMessage: rowDataRecieveMessage, isloadedRecieveMessage: true }

    // ==========================================================
    // /message/rooms/●●●/のパスに来た時に、この●●●のyorozuIdを取得する
    // ==========================================================
    case READ_MESSAGE_ROOM_USER_YOROZUID_EVENT:
      return { ...state, roomUserYorozuId: action.payload }

    // ==========================================================
    // ルームページごとに、メッセージを呼び出すときの処理
    // ==========================================================
    case READ_ROOMMESSAGE_EVENTS:
      const roomMessage = []
      const messageRoomUser = []
      const roomUserYorozuId = []

      // メッセージルームID(urlの一番最後(yozozo))は、送信者のyozozuIDでaction.payloadには、
      // 送信者のyozozuIDが入っている ex) http://localhost:3000/message/rooms/yozozo
      const roomMessageId = action.payload

      // 未加工のデータを残しておく(ルームメッセージの時に、日にちのソートで使う)
      const _rowDataRecieveMessage = _.cloneDeep(state.rowDataRecieveMessage)
      const _rowDataSenderMessage = _.cloneDeep(state.rowDataSenderMessage)

      // 自分あてに送信してくれた人のメッセージリストから、トークルームのIDと送信者のyorozuIdが同じメッセージを抽出する
      _.map(state.rowDataRecieveMessage, (message) => {
        if (roomMessageId === message.senderYorozuId) {
          roomMessage.push(message)
          // ルームユーザのニックネームを抽出する
          messageRoomUser.push(message.senderProfile.nickname)
          // ルームユーザーのyorozuIdを抽出する
          roomUserYorozuId.push(message.senderYorozuId)
        }
      })

      // 自分が送信したメッセージリストから、トークルームのIDと受信者のyorozuIdが同じメッセージを抽出する
      _.map(state.rowDataSenderMessage, (message) => {
        if (roomMessageId === message.receiverYorozuId) {
          roomMessage.push(message)
        }
      })

      // pushの注意
      // state.roomMessage.push(message)見たな感じで直接pushは上手く行かない
      // 参照に関しての問題がおこる

      // ルームの中のメッセージをソートする
      const sortRoomMessage = [...roomMessage].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23 16:27
      sortRoomMessage.map((message) => {
        // 1度作成日を加工した場合、2回目はエラーになるので、try,catchを行う
        try {
          const day = message['createdAt'].split('T')[0]
          const time = message['createdAt'].split('T')[1]
          const _time = time.split(':')
          const _day = day.split('-')
          message['createdAt'] = `${_day[0]}年${_day[1]}月${_day[2]} ${_time[0]}:${_time[1]}`
          return message
        } catch {
          // 加工されているものは、そのまま返す
          return { ...state, roomMessage: sortRoomMessage, messageRoomUser: messageRoomUser[0], roomUserYorozuId: roomUserYorozuId[0] }
        }
      })

      // tryのなかで、加工されたら加工済みの値を返す
      return {
        ...state,
        roomMessage: sortRoomMessage,
        messageRoomUser: messageRoomUser[0],
        roomUserYorozuId: roomUserYorozuId[0],
        rowDataRecieveMessage: _rowDataRecieveMessage,
        rowDataSenderMessage: _rowDataSenderMessage,
      }

    // ==========================================================
    // 自分が送信したメッセージリストの処理
    // ==========================================================
    case READ_MY_SEND_MESSAGE_EVENTS:
      console.log('自分が送信したメッセージ')
      console.log(action.payload.data)

      // 自分でメッセージを送信していない時の処理 (#action.payload.data[0].senderProfile.profileImageでエラーになる)
      if (action.payload.data.length === 0) {
        return { ...state, senderMessage: action.payload.data, senderProfileImage: '' }
      }

      // 未加工のデータを残しておく(ルームメッセージの時に、日にちのソートで使う)
      const rowDataSenderMessage = _.cloneDeep(action.payload.data)

      const senderProfileImage = action.payload.data[0].senderProfile.profileImage
      return {
        ...state,
        senderMessage: action.payload.data,
        senderProfileImage: senderProfileImage,
        rowDataSenderMessage: rowDataSenderMessage,
        isloadedSenderMessage: true,
      }

    // ==========================================================
    // 送信したメッセージと受信したメッセージを読み込み終わった時に行う処理
    // メッセージのトップページで、送信したメッセージと受信したメッセージ一覧を表示させるためのアクション
    // ==========================================================
    case READ_TOPPAGE_MESSAGE_LIST_EVENT:
      console.log('READ_TOPPAGE_MESSAGE_LIST_EVENT きた')

      // 送信したメッセージと受信したメッセージを最新順にソートしてくれる
      const messageTableList = sortMessage(state.rowDataRecieveMessage, state.rowDataSenderMessage)

      // isloadedSenderMessageとisloadedRecieveMessageをfalseしないと永遠に取得するので、falseにする

      return { ...state, messageTableList: messageTableList, isloadedSenderMessage: false, isloadedRecieveMessage: false }
    // return { ...state, messageTableList: messageTableList }

    // ==========================================================
    // メッセージの送信したときの処理
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
