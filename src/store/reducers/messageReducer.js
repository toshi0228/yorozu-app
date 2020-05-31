import { READ_MESSAGE_EVENTS, READ_ROOMMESSAGE_EVENTS, SEND_MESSAGE_EVENT, READ_MY_SEND_MESSAGE_EVENTS } from '../actionTypes'
import _ from 'lodash'

const DEFAULT_STATE = {
  recieveMessage: [],
  senderMessage: [],
  roomMessage: [],
}

// const DEFAULT_STATE = {
//   isLoading: false,
//   // トップページのprofileListのデータ
//   profileList: [],
//   // profileDetailページのデータ。planListとtagListは最初にmapで作業があるので先に初期値を入れる
//   profileDetail: { planList: [], tagList: [] },
// };

const messageReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ==========================================================
    // 全件のメッセージを送り出すときの処理
    // ==========================================================
    case READ_MESSAGE_EVENTS:
      // 作成日の加工 "2020-05-24T14:46:01.945895+09:00" -> 2020年10月23
      // const array = [
      //   '2020-05-24T14:46:01.945895+09:00',
      //   '2020-05-30T09:23:32+09:00',
      //   '2020-05-29T05:55:37.402814+09:00',
      //   '1943/2/25',
      //   '1942/6/18',
      //   '1969/1/14',
      //   '1940/7/7',
      //   '1965/5/16',
      // ]
      // const ascArray = [...array].sort((a, b) => new Date(a) - new Date(b))
      // console.log(ascArray)

      action.payload.data.map((message) => {
        message['createdAt'] = message.createdAt.split('T')[0]
        const time = message['createdAt'].split('-')
        message['createdAt'] = `${time[0]}年${time[1]}月${time[2]}`
        return message
      })
      return { ...state, recieveMessage: action.payload.data }

    // ==========================================================
    // ルームページごとに、メッセージを呼び出すときの処理
    // ==========================================================
    case READ_ROOMMESSAGE_EVENTS:
      // 自分に送信してくれた人のメッセージを抽出する

      const roomMessage = []
      const senderYorozuId = action.payload
      _.map(state.recieveMessage, (message) => {
        if (senderYorozuId === message.senderYorozuId) {
          roomMessage.push(message)
        }
      })
      // pushの注意
      // state.roomMessage.push(message)見たな感じで直接pushは上手く行かない
      // 参照に関しての問題がおこる
      return { ...state, roomMessage: roomMessage }

    // ==========================================================
    // 自分が送信したメッセージリストの処理
    // ==========================================================
    case READ_MY_SEND_MESSAGE_EVENTS:
      return { ...state, senderMessage: action.payload }

    // ==========================================================
    // メッセージの送信したときの処理
    // ==========================================================
    case SEND_MESSAGE_EVENT:
      return action.type
    default:
      // return state
      return state
  }
}

export default messageReducer
