import React from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

import { payment } from '../../store/actions/payment'

const StripeCheckoutButton = ({ price, paymentEvent }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51H2sQ2Ac2aWSlNWdWo97wMYthmjx2goPgJOXscnmHSOYRjGSBOgEpj6jn2JIIXhILpRvlDSgEOMUqk1Fs0f0fPoe00rUKABZcB'

  const onToken = (token) => {
    console.log(token)
    paymentEvent(token)
    alert('payment succesfull')
  }

  return (
    <StripeCheckout
      label="決済情報を入力に進む"
      name="佐藤 太郎"
      description={`your total is $${price}`}
      amount={1000}
      panelLabel="{{amount}}支払う"
      token={onToken}
      stripeKey={publishableKey}
      allowRememberMe={false}
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  paymentEvent: (token) => dispatch(payment(token)),
})
export default connect(null, mapDispatchToProps)(StripeCheckoutButton)
