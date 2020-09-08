import _ from 'lodash'

// ===================================================================
// トークルームのメッセージをソートする
// ===================================================================

export const sortTalkRoomMessage = (receiveMessage, sentMessage, yorozuId) => {
  // 最終的にrerurnする値
  const talkRoomInfo = {
    messageList: [],
    userNickname: [],
    yorozuId: [],
  }

  //   // メッセージルームID(urlの一番最後(yozozo))は、送信者のyozozuIDでaction.payloadには、
  //   // 送信者のyozozuIDが入っている ex) http://localhost:3000/message/rooms/yozozo
  const roomMessageId = yorozuId

  //   // 自分あてに送信してくれた人のメッセージリストから、トークルームのIDと送信者のyorozuIdが同じメッセージを抽出する
  _.map(receiveMessage, (message) => {
    if (roomMessageId === message.senderYorozuId) {
      //   roomMessage.push(message)
      talkRoomInfo['messageList'].push(message)
      // ルームユーザのニックネームを抽出する
      talkRoomInfo['userNickname'].push(message.senderProfile.nickname)
      // ルームユーザーのyorozuIdを抽出する
      talkRoomInfo['yorozuId'].push(message.senderYorozuId)
    }
  })

  // 自分が送信したメッセージリストから、トークルームのIDと受信者のyorozuIdが同じメッセージを抽出する
  _.map(sentMessage, (message) => {
    if (roomMessageId === message.receiverYorozuId) {
      talkRoomInfo['messageList'].push(message)
      // ルームユーザのニックネームを抽出する
      talkRoomInfo['userNickname'].push(message.receiverProfile.nickname)
      // ルームユーザーのyorozuIdを抽出する
      talkRoomInfo['yorozuId'].push(message.receiverYorozuId)
    }
  })

  // ルームの中のメッセージをソートする
  const sortRoomMessage = [...talkRoomInfo['messageList']].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23 16:27
  const _sortRoomMessage = sortRoomMessage.map((message) => {
    const day = message['createdAt'].split('T')[0]
    const time = message['createdAt'].split('T')[1]
    const _time = time.split(':')
    const _day = day.split('-')
    message['createdAt'] = `${_day[0]}年${_day[1]}月${_day[2]} ${_time[0]}:${_time[1]}`
    return message
  })

  // 最後returnする情報を少し加工する
  talkRoomInfo['messageList'] = _sortRoomMessage
  talkRoomInfo['userNickname'] = talkRoomInfo['userNickname'][0]
  talkRoomInfo['yorozuId'] = talkRoomInfo['yorozuId'][0]

  return talkRoomInfo
}
