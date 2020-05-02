import _ from 'lodash';
import { READ_PROFILE_EVENTS, READ_PROFILE_DETAIL_EVENT } from '../actionTypes';
// import Profile from '../../models/profile';

const DEFAULT_STATE = {
  isLoading: false,
  // トップページのprofileListのデータ
  profileList: [],
  // profileDetailページのデータ なので、topページを表示の時は空のオブジェクト
  profileDetail: { planList: [], tagList: [] },
};

const profileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // トップページのプロフィールリストを読み込む
    // 最初にプロフィールを読み込む処理
    case READ_PROFILE_EVENTS:
      // 最初にデーターを初期化する
      state.profileList = [];
      // action.payloadの中にprofileリストをstate.profileListに入れる:[{},{}]
      action.payload.forEach((profileData) => {
        state.profileList.push(profileData);
      });
      return { ...state, isLoading: true };

    // プロフィールの詳細ページを読み込む
    case READ_PROFILE_DETAIL_EVENT:
      // console.log('READ_PROFILE_DETAIL_EVENT');
      // action.payLoadには、idに紐づいたオブジェクトが入っている:{id:"1"...}

      // タグのみそれぞれのプランに紐づいているの,それぞれのタグを取り出す
      // ex) tagList:["企画", "インスターグラマー", "インスターグラマー"]
      const tags = action.payload.planList.map((plan) => {
        return plan.tags[0].name;
      });
      // リストの重複を無くしてくれる ex)["企画", "インスターグラマー"]
      // const tagList = _.union(tags);
      state.profileDetail.tagList = _.union(tags);

      // state.profileDetailにgetリクエストで受け取ったオブジェクトを入れる
      state.profileDetail = { ...state.profileDetail, ...action.payload };

      return { ...state, isLoading: true };

    default:
      return state;
  }
};

export default profileReducer;
