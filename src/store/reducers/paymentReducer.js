import React from 'react'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { CREATE_PAYMENT_CUSTOMER } from '../../store/actionTypes'

const DEFAULT_STATE = {
  // stripe側で管理しているクレジットカードに紐づいた顧客情報
  customerId: '',
  // stripe側でクレジットカード情報をtoken化したもの
  paymentMethodId: '',
}

const paymentReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // ==========================================================
    // カード情報を登録した時の処理
    // ==========================================================
    case CREATE_PAYMENT_CUSTOMER:
      // 決済情報とクレジットカード情報を紐づけるための重要なID
      const paymentMethodId = action.payload['paymentMethodId']

      // サーバー側で管理しているアカウント側で紐づくID
      const customerId = action.payload['id']

      notification.open({
        message: 'カード情報を登録できました',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })

      return { ...state, customerId: customerId, paymentMethodId: paymentMethodId }
    default:
      return state
  }
}

export default paymentReducer
