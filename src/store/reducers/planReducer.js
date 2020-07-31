import React from 'react'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

import Plan from '../../models/plan'
import { CREATE_PLAN_EVENT, CHECK_INPUT_PLAN_ITEM_EVENT, EDIT_PLAN_ITEM_EVENT } from '../actionTypes'

const DEFAULT_STATE = {
  ...new Plan({}),

  // 空白がなければ、profileを登録できる準備ができたことを伝える
  isToRegister: false,

  // プランで登録する項目
  registeredPlan: {
    id: '',
    title: '',
    description: '',
    image: [],
    price: '',
    tags: [],
  },
}

const planReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ======================================================================
    // プラン登録
    // ======================================================================
    case CREATE_PLAN_EVENT:
      console.log('CREATE_PLAN_EVENT')

      notification.open({
        message: 'プランを登録できました',
        description: 'プレビューを確認してみてくださいね',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })

      // isToRegister: falseにしないと永遠に登録されてしまうので、登録処理が終わればfalseに戻す
      return { ...state, isToRegister: false }

    // ======================================================================
    // プランの登録画面で、インプット項目に空白がないか確認
    // ======================================================================
    case CHECK_INPUT_PLAN_ITEM_EVENT:
      // planのinput項目の配列
      // action.payload => ["", "", Array(0), "", Array(0)]

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
          message: 'プランの登録に失敗しました',
          description: '入力項目に空白の場所があるようです。ご確認お願いします!!',
        })
      } else {
        // 空白がなければ、profileを登録できる準備ができたことを伝える
        return { ...state, isToRegister: true }
      }
      return state

    case EDIT_PLAN_ITEM_EVENT:
      // タグの名前だけの配列を作る
      //action.payload.tags => [{…}, {…}, {…}]
      // tag_List => ["インスターグラマー", "記念日", "エンジニア"]
      const tag_List = action.payload.tags.map((tag) => {
        return tag.name
      })

      return {
        ...state,
        registeredPlan: {
          id: action.payload['id'],
          title: action.payload['title'],
          description: action.payload['description'],
          image: action.payload['image'],
          price: action.payload['price'],
          tags: tag_List,
        },
      }

    default:
      return state
  }
}

export default planReducer
