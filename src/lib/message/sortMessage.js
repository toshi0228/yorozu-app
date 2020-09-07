import _ from 'lodash'

// ========================================================
// 送信、受信のメッセージをTOPページに表示できるようにソートする
// ========================================================

export const sortMessage = (receiveMessage, sendMessage) => {
  // メッセージのトップページには、ラインみたいにトークールームの一覧を作るために、
  // 送信メッセージと受信メッセージをがっちゃんこするために、少しデータを加工する

  //   受信メッセージの加工
  const recieveMessageList = receiveMessage.map((message) => {
    const _message = {
      id: message.id,
      user: message.senderYorozuId,
      messageContent: message.messageContent,
      senderProfile: message.senderProfile,
      unread: message.unread,
      createdAt: message.createdAt,
    }
    return _message
  })

  const sendMessageList = sendMessage.map((message) => {
    const _message = {
      id: message.id,
      user: message.receiverYorozuId,
      messageContent: message.messageContent,
      senderProfile: message.senderProfile,
      unread: message.unread,
      createdAt: message.createdAt,
    }
    return _message
  })

  // 受信したメッセージと送信者のメッセージを結合させる
  const recieveAndSendMessage = [...recieveMessageList, ...sendMessageList]

  // 新しいメッセージをから表示できるようにソートする
  const sortMessagelist = [...recieveAndSendMessage].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23
  const processingMessageList = sortMessagelist.map((message) => {
    message['createdAt'] = message.createdAt.split('T')[0]
    const time = message['createdAt'].split('-')
    message['createdAt'] = `${time[0]}年${time[1]}月${time[2]}`
    return message
  })

  // メッセージ作成タブの右サイドのユーザーリストを作成する
  const userList = _.map(processingMessageList, (message) => {
    return message.user
  })

  // ユーザーリストから、重複をなくす ["のびた", "しずかちゃん", "のびた"] -> ["のびた", "しずかちゃん"]
  const _userList = _.union(userList)

  // ["のびた", "しずかちゃん"]から、ユーザーごとの最新のメッセージを取り出す
  const _processingMessageList = []
  _userList.forEach((user) => {
    const newMessage = _.find(processingMessageList, (message) => {
      return _.includes(message.user, user)
    })
    _processingMessageList.push(newMessage)
  })

  return _processingMessageList
}
