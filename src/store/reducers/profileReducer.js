import _ from 'lodash'
import {
  PROFILE_DETAIL_INITIALIZE_EVENT,
  READ_PROFILE_EVENTS,
  READ_PROFILE_DETAIL_EVENT,
  CREATE_PROFILE_EVENT,
  READ_ACCOUNT_ID_EVENT,
  SEARCH_PROFILE_EVENT,
  PROFILE_RRESET_EVENT,
  PLUS_REVIEW_EVENT,
  MINUS_REVIEW_EVENT,
} from '../actionTypes'
// import Profile from '../../models/profile';

const DEFAULT_STATE = {
  isLoading: false,
  // トップページのprofileListのデータ
  profileList: [],
  // profileDetailページのデータ。planListとtagListは最初にmapで作業があるので先に初期値を入れる
  profileDetail: { planList: [], tagList: [], score: { positiveScore: 0, negativeScore: 0 } },

  // アカウントのid profileを作成の時に必要 サーバー側でaccountとprofileでリレーションしているので、accountIdが必要
  accountId: '',
}

const profileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // =========================================================================================
    // プランページに移動した時に、profileDetailデータが残っている事があるので、
    // トップページに移動した時に初期化する
    // =========================================================================================
    case PROFILE_DETAIL_INITIALIZE_EVENT:
      return { ...state, profileDetail: { planList: [], tagList: [], score: { positiveScore: 0, negativeScore: 0 } } }

    // =========================================================================================
    // トップページのプロフィールリストを読み込む
    // 最初にプロフィールを読み込む処理
    // =========================================================================================
    case READ_PROFILE_EVENTS:
      // 最初にデーターを初期化する
      state.profileList = []
      // action.payloadの中にprofileリストをstate.profileListに入れる:[{},{}]
      action.payload.forEach((profileData) => {
        state.profileList.push(profileData)
      })
      return { ...state, isLoading: true }

    // =========================================================================================
    // プロフィールの検索の時、topページ以外から遷移する時に、前のデータが残っているので検索前にリセットする
    // =========================================================================================
    case PROFILE_RRESET_EVENT:
      console.log('PROFILE_RRESET_EVENT')
      return { ...state, profileList: [] }

    // =========================================================================================
    // よろず屋(profile)の検索
    // =========================================================================================
    case SEARCH_PROFILE_EVENT:
      console.log('SEARCH_PROFILE_EVENT')

      if (action.payload.data === '検索条件にマッチしたものがありませんでした') {
        return { ...state, profileList: [] }
      }
      return { ...state, profileList: action.payload.data }

    // =========================================================================================
    // プロフィールの詳細ページを読み込む
    // =========================================================================================
    case READ_PROFILE_DETAIL_EVENT:
      // アカウント登録した時は、action.payload.planListは,undifinedになるのでif
      if (action.payload.planList) {
        // action.payLoadには、idに紐づいたオブジェクトが入っている:{id:"1"...}

        // タグのみそれぞれのプランに紐づいているの,それぞれのタグを取り出す
        // ex) tagList:["企画", "インスターグラマー", "インスターグラマー"]

        // tags:[[],[]]
        const tags = action.payload.planList.map((plan) => {
          // タグのみ取り出す
          // [{ id: '', name: '' }, {}] -> ["インスターグラマー", "企画"]
          return _.map(plan.tags, (tag) => tag.name)
        })

        // _.unionはリストの重複を無くしてくれる
        // ex) _.union([2], [1, 2]) => [2, 1]
        state.profileDetail.tagList = _.union(...tags)

        // state.profileDetailにgetリクエストで受け取ったオブジェクトを入れる
        state.profileDetail = { ...state.profileDetail, ...action.payload }

        return { ...state, isLoading: true }
      } else {
        return { ...state, isLoading: false }
      }

    // =========================================================================================
    // ログインユーザーのアカウントIDを調べる
    // =========================================================================================
    case READ_ACCOUNT_ID_EVENT:
      return { ...state, accountId: action.payload }

    // =========================================================================================
    // プロフィールを作成する
    // =========================================================================================
    case CREATE_PROFILE_EVENT:
      console.log('CREATE_PROFILE_EVENT')
      return state

    // =========================================================================================
    // プランを買ってくれた人がプラスの評価をする
    // =========================================================================================
    case PLUS_REVIEW_EVENT:
      const _positiveScore = state.profileDetail.score['positiveScore'] + action.payload.positiveScore
      const _negativeScore = state.profileDetail.score['negativeScore'] + action.payload.negativeScore
      return {
        ...state,
        profileDetail: { ...state.profileDetail, score: { positiveScore: _positiveScore, negativeScore: _negativeScore } },
      }

    // =========================================================================================
    // プランを買ってくれた人がマイナスの評価をする
    // =========================================================================================
    case MINUS_REVIEW_EVENT:
      const __negativeScore = state.profileDetail.score['negativeScore'] + action.payload
      const __positiveScore = state.profileDetail.score['positiveScore']
      return {
        ...state,
        profileDetail: { ...state.profileDetail, score: { positiveScore: __positiveScore, negativeScore: __negativeScore } },
      }

    default:
      return state
  }
}

export default profileReducer
