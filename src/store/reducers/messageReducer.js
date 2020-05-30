import { READ_MESSAGE_EVENTS, SEND_MESSAGE_EVENT } from '../actionTypes'

const messageReducer = (stete = '', action) => {
  switch (action.type) {
    case READ_MESSAGE_EVENTS:
      return action.payload.data
    case SEND_MESSAGE_EVENT:
      return action.type

    default:
      return ''
  }
}

export default messageReducer
