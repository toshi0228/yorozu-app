import { SEND_MESSAGE_EVENT } from '../actionTypes';

const messageReducer = (stete = '', action) => {
  switch (action.type) {
    case SEND_MESSAGE_EVENT:
      return action.type;

    default:
      return '';
  }
};

export default messageReducer;
