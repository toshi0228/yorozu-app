import React from 'react'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { READ_PAYMENT_CUSTOMER, READ_PAYMENT_CUSTOMER_ERROR, CREATE_PAYMENT_CUSTOMER, UPDATE_CARD_INFO } from '../../store/actionTypes'

const DEFAULT_STATE = {
  // stripe側で管理しているクレジットカードに紐づいた顧客情報
  customerId: '',
  // stripe側でクレジットカード情報をtoken化したもの
  paymentMethodId: '',
  // カードの種類(visa, master等)
  cardBrand: '',
  // カード番号の最後の4桁
  cardlast4: '',
}

const paymentReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ==========================================================
    // sripeから発行された顧客情報、カード情報のトークンを取得する
    // ==========================================================
    case READ_PAYMENT_CUSTOMER:
      const stripInfo = action.payload.data
      return {
        ...state,
        customerId: stripInfo['customer'],
        paymentMethodId: stripInfo['id'],
        cardBrand: stripInfo.card.brand,
        cardlast4: stripInfo.card.last4,
      }

    // ==========================================================
    // sripeから発行された顧客情報取得に失敗した時(データを登録していない)
    // ==========================================================
    case READ_PAYMENT_CUSTOMER_ERROR:
      return { ...state, customerId: '', paymentMethodId: '', cardBrand: '', cardlast4: '' }

    // ==========================================================
    // カード情報を登録した時の処理
    // ==========================================================
    case CREATE_PAYMENT_CUSTOMER:
      // 決済情報とクレジットカード情報を紐づけるための重要なID
      const paymentMethodId = action.payload['id']

      // サーバー側で管理しているアカウント側で紐づくID
      const customerId = action.payload['customer']

      // クレジット会社
      const cardBrand = action.payload.card['brand']

      // クレジットカードの下4けた
      const cardLast4 = action.payload.card['last4']

      notification.open({
        message: 'カード情報を登録できました',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })

      return { ...state, customerId: customerId, paymentMethodId: paymentMethodId, cardBrand: cardBrand, cardlast4: cardLast4 }

    // ==========================================================
    // カード情報の更新処理
    // ==========================================================
    case UPDATE_CARD_INFO:
      notification.open({
        message: 'カード情報を更新できました',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })
      const updataStripInfo = action.payload.data

      return {
        ...state,
        customerId: updataStripInfo['customer'],
        paymentMethodId: updataStripInfo['id'],
        cardBrand: updataStripInfo.card.brand,
        cardlast4: updataStripInfo.card.last4,
      }
    default:
      return state
  }
}

export default paymentReducer
