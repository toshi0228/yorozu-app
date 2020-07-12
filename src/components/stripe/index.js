import React from 'react'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'

import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

import { payment } from '../../store/actions/payment'

const CheckoutForm = ({ price, paymentEvent }) => {
  const stripe = useStripe()

  // カード情報を入力した値を取得するhooks?
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // 決済処理？ 必要なのは、カード決済ということと、クレジットカードの値？
    // elements.getElement(CardElement)は、引数にCardElementを入れることでカード情報を取得する？
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: '佐藤 二郎',
      },
      //   card: elements.getElement(CardElement),
    })

    // うまく言えば、エラーはundifinedになるので、以下のように書く
    if (!error) {
      const { id } = paymentMethod
      console.log('ポイント')
      //   console.log({ id, amount: price })

      paymentEvent({ id, price })
    }
  }

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    color: '#fff',
    fontSize: '196px',
    background: 'red',
  }

  return (
    // <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', background: 'yellow' }}>
    <form onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <CardNumberElement options={CARD_OPTIONS} />
      <CardExpiryElement />
      <CardCvcElement />

      <button type="submit" disabled={!stripe}>
        お支払い
      </button>
    </form>
  )
}

const stripePromise = loadStripe(
  '	pk_test_51H2sQ2Ac2aWSlNWdWo97wMYthmjx2goPgJOXscnmHSOYRjGSBOgEpj6jn2JIIXhILpRvlDSgEOMUqk1Fs0f0fPoe00rUKABZcB'
)

// ストライプのコンポーネント
const Stripe = ({ price, paymentEvent }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} paymentEvent={paymentEvent} />
    </Elements>
  )
}

const mapDispatchToProps = (dispatch) => ({
  paymentEvent: (token) => dispatch(payment(token)),
})
export default connect(null, mapDispatchToProps)(Stripe)

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
