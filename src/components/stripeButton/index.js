import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51H2sQ2Ac2aWSlNWdWo97wMYthmjx2goPgJOXscnmHSOYRjGSBOgEpj6jn2JIIXhILpRvlDSgEOMUqk1Fs0f0fPoe00rUKABZcB'

  const onToken = (token) => {
    console.log(token)
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

export default StripeCheckoutButton
