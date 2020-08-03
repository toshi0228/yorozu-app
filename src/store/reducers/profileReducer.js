import React from 'react'
import _ from 'lodash'
import {
  PROFILE_DETAIL_INITIALIZE_EVENT,
  READ_PROFILE_EVENTS,
  READ_PROFILE_DETAIL_EVENT,
  // CREATE_PROFILE_EVENT,
  READ_ACCOUNT_ID_EVENT,
  SEARCH_PROFILE_EVENT,
  RESET_PROFILE_LIST_EVENT,
  READ_PROFILE_ITEM_EVENT,
  UPDATE_PROFILE_EVENT,
  FIN_UPDATE_PROFILE_EVENT,
  CHECK_INPUT_ITEM_EVENT,
  FIN_REGISTER_PROFILE_EVENT,
} from '../actionTypes'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

const DEFAULT_STATE = {
  // httpGETをしたことがあるかどうか
  isLoading: false,

  // トップページのprofileListのデータ
  profileList: [],

  // profileDetailページのデータ。planListとtagListは最初にmapで作業があるので先に初期値を入れる
  profileDetail: { planList: [], tagList: [], score: { positiveScore: 0, negativeScore: 0 } },

  // アカウントのid profileを作成の時に必要 サーバー側でaccountとprofileでリレーションしているので、accountIdが必要
  accountId: '',

  // プロフィールで登録する項目
  registeredProfile: {
    nickname: '',
    yorozuyaName: '',
    yorozuId: '',
    profileImage: [],
    profileDescription: '',
    yorozuyaThumbnailImage: [],
  },

  //プロフィールを登録・更新したら、trueになる
  isUpdateProfile: false,

  // プロフィールを登録ボタンを押して、空白なしの確認ができたらTrueになる
  isToRegister: false,
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
    // ロゴを押したときに、isLoadingをfalseにする
    // =========================================================================================
    case RESET_PROFILE_LIST_EVENT:
      return { ...state, isLoading: false }

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
    // プロフィール項目のデータを表示させる
    // =========================================================================================
    case READ_PROFILE_ITEM_EVENT:
      const nickname = action.payload['nickname']
      const yorozuyaName = action.payload['yorozuyaName']
      const yorozuId = action.payload['yorozuId']
      const profileDescription = action.payload['profileDescription']
      const profileImage = action.payload['profileImage']
      const yorozuyaThumbnailImage = action.payload['yorozuyaThumbnailImage']

      // profileに登録してある項目
      const registeredProfile = {
        nickname: nickname,
        yorozuyaName: yorozuyaName,
        yorozuId: yorozuId,
        profileImage: profileImage,
        profileDescription: profileDescription,
        yorozuyaThumbnailImage: yorozuyaThumbnailImage,
      }

      return { ...state, registeredProfile: registeredProfile }

    // =========================================================================================
    // プロフィールのデータの更新
    // =========================================================================================
    case UPDATE_PROFILE_EVENT:
      // エラーがあった場合は、失敗の通知をだす
      if (action.payload.error) {
        notification.error({
          message: 'プロフィールの更新に失敗しました',
          description: '画像データが大きいようです。もう一度試してみてください',
        })
        // エラーがなあった場合は、プロフィールの更新に成功したことを通知する
      } else {
        notification.open({
          message: 'プロフィールの更新ができました',
          description: 'プレビューを確認してみてくださいね',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        })

        //profileに登録してある項目 新しく更新したデータにする
        const registeredProfile = {
          nickname: action.payload.data['nickname'],
          yorozuyaName: action.payload.data['yorozuyaName'],
          yorozuId: action.payload.data['yorozuId'],
          profileImage: action.payload.data['profileImage'],
          profileDescription: action.payload.data['profileDescription'],
          yorozuyaThumbnailImage: action.payload.data['yorozuyaThumbnailImage'],
        }

        return { ...state, registeredProfile: registeredProfile, isUpdateProfile: true }
      }

      return state

    // =========================================================================================
    // プロフィールの登録完了  isToRegisterを true から false にする
    // =========================================================================================
    case FIN_REGISTER_PROFILE_EVENT:
      notification.open({
        message: 'プロフィールの登録ができました',
        description: 'プレビューを見てみましょう!!',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })
      return { ...state, isToRegister: false }

    // =========================================================================================
    // プロフィールの更新終了  updateProfileを true から false にする
    // =========================================================================================
    case FIN_UPDATE_PROFILE_EVENT:
      return { ...state, isUpdateProfile: false }

    // =========================================================================================
    // プロフィールの登録ボタンを押した時に、空白がないかなど中身を確認する
    // =========================================================================================
    case CHECK_INPUT_ITEM_EVENT:
      // profileのinput項目の配列
      // action.payload => [undefined, undefined, undefined, Array(0), undefined, Array(0)]

      const emptyItems = []
      // inputがエラーの項目を抽出する profileImageは、配列なのでitem.lengthが0なら空白とする
      action.payload.forEach((item, index) => {
        // 配列でない場合、item.lengthがエラーになるのでtry, catchを使う
        try {
          // 画像データがない場合は、Array(0)になる
          if (item.length === 0) {
            emptyItems.push(index)
          }
        } catch {
          // 文字データは、こちら側で確認する 値がundefinedなら、emptyItemsに入れる
          if (!item) {
            emptyItems.push(index)
          }
        }
      })

      // emptyItemsの配列に値があれば、空白があるので、アラートをだす
      if (emptyItems.length > 0) {
        notification.error({
          message: 'プロフィールの登録に失敗しました',
          description: '入力項目に空白の場所があるようです。ご確認お願いします!!',
        })
      } else {
        // 空白がなければ、profileを登録できる準備ができたことを伝える
        return { ...state, isToRegister: true }
      }

      return state

    default:
      return state
  }
}

export default profileReducer
