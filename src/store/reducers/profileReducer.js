import Profile from '../../models/profile';
import { READ_PROFILE_EVENTS, READ_PROFILE_DETAIL_EVENT } from '../actionTypes';

const DEFAULT_STATE = {
  isLoading: false,
  planList: [],
  ...new Profile({}),
};

const profileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // トップページのプロフィールリストを読み込む
    // 最初にプロフィールを読み込む処理

    case READ_PROFILE_EVENTS:
      return action.payload;

    // プロフィールの詳細ページを読み込む
    case READ_PROFILE_DETAIL_EVENT:
      state[0][0].isLoading = true;
      return { ...state, ...action.payload };

    default:
      // 読み込み時、配列出ないとうまく行かないので、そのまま渡す
      // プロフィールはリストの形なので、defaultでもリストにしておく
      return [state];
  }
};

export default profileReducer;
