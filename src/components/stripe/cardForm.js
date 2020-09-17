import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Payment from '../payment/index'

// =======================================================================
// カードの入力フォーム
// =======================================================================

const CardForm = () => {
  const stripePromise = loadStripe(
    '	pk_test_51H2sQ2Ac2aWSlNWdWo97wMYthmjx2goPgJOXscnmHSOYRjGSBOgEpj6jn2JIIXhILpRvlDSgEOMUqk1Fs0f0fPoe00rUKABZcB'
  )
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  )
}

export default CardForm
