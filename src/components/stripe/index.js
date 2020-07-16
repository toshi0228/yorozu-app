import React from 'react'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../form/checkoutForm/index'
import { Modal, Button, Row, Col } from 'antd'

import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  '	pk_test_51H2sQ2Ac2aWSlNWdWo97wMYthmjx2goPgJOXscnmHSOYRjGSBOgEpj6jn2JIIXhILpRvlDSgEOMUqk1Fs0f0fPoe00rUKABZcB'
)

// ストライプのコンポーネント
const Stripe = ({ price }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} />
    </Elements>
  )
}

// const mapDispatchToProps = (dispatch) => ({
//   paymentEvent: (token) => dispatch(payment(token)),
// })
// export default connect(null, mapDispatchToProps)(Stripe)

export default Stripe

// ====================================================================================================
// カードエレメントに関して 2020 7 11
// <CardElement />
// 上記のものを、記入するだけで、ユーザーが入力するカード番号のフォームなどが表示されるようになる
// ====================================================================================================

// ====================================================================================================
// stripe.createPaymentMethodに関して 2020 7 11

// 以下メソッドを実行した時の関数のreturn
// stripe.createPaymentMethod({
//   type: 'card',
//   card: elements.getElement(CardElement),
//   billing_details: {
//     name: 'Jenny Rosen',
//   },
// })

// 成功した時のreturn
// paymentMethod: {id: "pm_1H3xNuAc2aWSlNWdvH0M6bWY", object: "payment_method", billing_details: {…}, card: {…}, created: 1594530354, …}

// エラーした時のreturn
// error: {code: "incomplete_number", type: "validation_error", message: "カード番号に不備があります。"}
// ====================================================================================================

// ====================================================================================================
// elements.getElement(CardNumberElement)に関して 2020 7 12

// elements.getElement()の引数は、
// CardElementか、CardNumberElementを入れることができる

// ====================================================================================================

// ====================================================================================================
// stripe.createPaymentMethodのbilling_detailsに関して 2020 712

//   billing_details: {
//     name: 'Jenny Rosen',
//   },

// billing_detailsのnameをすることで、stripeの顧客リストの名前がつく
// ====================================================================================================

// ====================================================================================================
// useStripe()に関して 2020 7 14

//  <Elements stripe={stripePromise}>
//   この中でしか、wrapされたコンポーネントしたかuseStripeは使えない
// </Elements>

// ====================================================================================================
