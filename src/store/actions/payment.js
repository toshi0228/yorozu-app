import { getPayment, postPayment, postPaymentCustomer, postPlanContract, postMessage, patchCardInfo } from '../../services/ApiRequest'
import { checkAccountId } from '../../services/authApiRequest'
import { READ_PAYMENT_CUSTOMER, CREATE_PAYMENT_CUSTOMER, READ_PAYMENT_CUSTOMER_ERROR, UPDATE_CARD_INFO } from '../actionTypes'
import { sentPlanContract } from './planContract'
import { sendMessageLoginUser, readRoomMessage } from './message'

export const payment = (token) => (dispatch) => {
  // stripeのデータでは、必要ないがサーバーサイドで必要なデータ
  const contractData = token.contractData
  const messageData = token.messageData

  // stripe処理で不必要なデータは、削除する
  delete token.contractData
  delete token.messageData

  // stripe処理
  postPayment(token).then((res) => {
    // stripe処理でうまくいったら、サーバーサイドに、誰がどのプランを購入したか送る
    postPlanContract(contractData).then((res) => {
      dispatch(sentPlanContract(res.data))
    })

    // stripe処理でうまくいったら、プランオーナーにメッセージも送る。相手は、メッセージ画面からプランの承認を押すことができる
    postMessage(messageData)
      .then((res) => {
        //res.dataの中 ->{senderYorozuId: "aaa", receiverYorozuId: "jaian", messageContent: "新しいメッセージを送信" …}
        dispatch(sendMessageLoginUser(res.data))
        // 以下の処理は、メッセージルームからメッセージした時に役立つ処理
        dispatch(readRoomMessage(res.data.receiverYorozuId))
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

// ==========================================================================
// stripeから発行されたcutomer_id,paymentMethodIdを取得する
// ==========================================================================

export const fetchPayment = (authToken) => (dispatch) => {
  return getPayment(authToken['access'])
    .then((customer) => {
      dispatch(readPayment(customer))
    })
    .catch((e) => {
      dispatch(createPaymentCustomerError(e))
    })
}

const readPayment = (customer) => {
  return {
    type: READ_PAYMENT_CUSTOMER,
    payload: customer,
  }
}

// stripeで顧客情報を登録していない、取得できないときの処理
const createPaymentCustomerError = (e) => {
  return {
    type: READ_PAYMENT_CUSTOMER_ERROR,
    payload: e,
  }
}

// ==========================================================================
// stripeの顧客情報を登録する
// accountInfo =>{paymentMethodId, authtoken}
// paymentMethodIdは、カード情報をstripe側でtokenにしたもの
// ==========================================================================
export const registerdCard = (accountInfo) => (dispatch) => {
  const paymentMethodId = accountInfo.paymentMethodId
  // 最初にユーザーのtauthTokenから,uidとemailを取得する
  // checkAccountIdのreturn  ex) {id: "e3f5c447-1a7f-4633-8874-17c3048fc62", email: "n@gmail.com"}
  checkAccountId(accountInfo.authToken.access)
    .then((res) => {
      const { id, email } = res.data
      postPaymentCustomer({ id, email, paymentMethodId }).then((customer) => {
        dispatch(createPaymentCustomer(customer.data))
      })
    })
    .catch((e) => {
      console.log('エラー')
    })
}

const createPaymentCustomer = (customer) => {
  return {
    type: CREATE_PAYMENT_CUSTOMER,
    payload: customer,
  }
}

// ==========================================================================
// カード情報を更新する
// ==========================================================================
export const updateCard = ({ customerId, prevPaymentMethodId, nextPaymentMethodId }) => (dispatch) => {
  patchCardInfo({ customerId, prevPaymentMethodId, nextPaymentMethodId }).then((customer) => {
    dispatch(updateCardInfo(customer))
  })
}

const updateCardInfo = (customer) => {
  return {
    type: UPDATE_CARD_INFO,
    payload: customer,
  }
}
