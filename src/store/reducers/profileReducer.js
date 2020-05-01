import _ from 'lodash';
import { READ_PROFILE_EVENTS, READ_PROFILE_DETAIL_EVENT } from '../actionTypes';
// import Profile from '../../models/profile';

const DEFAULT_STATE = {
  isLoading: false,
  planList: [],
  tagList: [],
  // ...new Profile({}),
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

      // ex) tagList:["企画", "インスターグラマー", "インスターグラマー"]
      const tags = action.payload.planList.map((plan) => {
        return plan.tags[0].name;
      });
      // リストの重複を無くしてくれる ex)["企画", "インスターグラマー"]
      const tagList = _.union(tags);
      return { ...state, ...action.payload, tagList };

    default:
      // 読み込み時、配列出ないとうまく行かないので、そのまま渡す
      // プロフィールはリストの形なので、defaultでもリストにしておく
      return [state];
  }
};

export default profileReducer;
