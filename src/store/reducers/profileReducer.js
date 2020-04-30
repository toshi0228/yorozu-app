import Profile from '../../models/profile';
import { READ_PROFILE_EVENTS } from '../actionTypes';

const DEFAULT_STATE = {
  isLoading: false,
  planList: [],
  ...new Profile({}),
};

const profileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case READ_PROFILE_EVENTS:
      return { ...state, ...action.payload, isLoading: true };
    default:
      return state;
  }
};

export default profileReducer;
