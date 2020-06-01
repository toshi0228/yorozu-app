import { READ_MESSAGE_EVENTS, READ_ROOMMESSAGE_EVENTS, SEND_MESSAGE_EVENT, READ_MY_SEND_MESSAGE_EVENTS } from '../actionTypes'
import _ from 'lodash'

const DEFAULT_STATE = {
  recieveMessage: [],
  rowDataRecieveMessage: [],
  senderMessage: [],
  roomMessage: [],
  senderProfileImage: '',
  // MessageRoomUser -> 誰に送信するか
  messageRoomUser: '',
}

// rowDataRecieveMessageは、メッセージルームのページを開く時、送信したメールと、受信したメールをミックスして、
// 送信時間ごとにリストするため、時間を加工していないデータを残しておく。

const messageReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ==========================================================
    // 自分宛に届いた全てのメッセージの処理
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
      console.log(_userList)

      // ["のびた", "しずかちゃん"]から、ユーザーごとの最新のメッセージを取り出す
      const _recieveMessageList = []
      _userList.forEach((user) => {
        const newMessage = _.find(recieveMessageList, (message) => {
          return _.includes(message.senderProfile.nickname, user)
        })
        _recieveMessageList.push(newMessage)
      })
      // console.log(newMessageList)

      return { ...state, recieveMessage: _recieveMessageList, rowDataRecieveMessage: rowDataRecieveMessage }

    // ==========================================================
    // ルームページごとに、メッセージを呼び出すときの処理
    // ==========================================================
    case READ_ROOMMESSAGE_EVENTS:
      const roomMessage = []
      const messageRoomUser = []
      // メッセージルームID(urlの一番最後(yozozo))は、送信者のyozozuIDでaction.payloadには、
      // 送信者のyozozuIDが入っている ex) http://localhost:3000/message/rooms/yozozo
      const roomMessageId = action.payload

      // 自分に送信してくれた人のメッセージリストから、トークルームのIDと送信者のyorozuIdが同じメッセージを抽出する
      _.map(state.rowDataRecieveMessage, (message) => {
        if (roomMessageId === message.senderYorozuId) {
          roomMessage.push(message)
          messageRoomUser.push(message.senderProfile.nickname)
        }
      })

      // 自分が送信したメッセージリストから、トークルームのIDと受信者のyorozuIdが同じメッセージを抽出する
      _.map(state.senderMessage, (message) => {
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
        const day = message['createdAt'].split('T')[0]
        const time = message['createdAt'].split('T')[1]
        const _time = time.split(':')
        const _day = day.split('-')
        message['createdAt'] = `${_day[0]}年${_day[1]}月${_day[2]}　${_time[0]}:${_time[1]}`
        return message
      })
      return { ...state, roomMessage: sortRoomMessage, messageRoomUser: messageRoomUser[0] }

    // ==========================================================
    // 自分が送信したメッセージリストの処理
    // ==========================================================
    case READ_MY_SEND_MESSAGE_EVENTS:
      // 自分でメッセージを送信していない時の処理 (#action.payload.data[0].senderProfile.profileImageでエラーになる)
      if (action.payload.data.length === 0) {
        return { ...state, senderMessage: action.payload.data, senderProfileImage: '' }
      }

      const senderProfileImage = action.payload.data[0].senderProfile.profileImage
      return { ...state, senderMessage: action.payload.data, senderProfileImage: senderProfileImage }

    // ==========================================================
    // メッセージの送信したときの処理
    // ==========================================================
    case SEND_MESSAGE_EVENT:
      return action.type
    default:
      return state
  }
}

export default messageReducer
