import { postPayment, postPaymentCustomer, postPlanContract, postMessage } from '../../services/ApiRequest'
import { checkAccountId } from '../../services/authApiRequest'
import { CREATE_PAYMENT_CUSTOMER } from '../actionTypes'
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
        dispatch(createPaymentCustomer({ ...customer.data, paymentMethodId }))
      })
    })
    .catch((e) => {
      console.log(e + 'エラー')
    })
}

const createPaymentCustomer = (customer) => {
  return {
    type: CREATE_PAYMENT_CUSTOMER,
    payload: customer,
  }
}
