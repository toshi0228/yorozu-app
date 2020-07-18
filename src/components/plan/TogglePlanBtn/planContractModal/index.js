import React from 'react'
import { connect } from 'react-redux'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import ModalContent from './ModalContent'
import LoginAttentionModal from '../../../modal/loginAttention'
import PlanDataContext from '../../../../contexts/PlanDataContext'
import { planContract } from '../../../../store/actions/planContract'
import { sendMessage } from '../../../../store/actions/message'

// ====================================================================
// プランリクエストのモーダル
// ====================================================================

const stripePromise = loadStripe(
  '	pk_test_51H2sQ2Ac2aWSlNWdWo97wMYthmjx2goPgJOXscnmHSOYRjGSBOgEpj6jn2JIIXhILpRvlDSgEOMUqk1Fs0f0fPoe00rUKABZcB'
)

// プランに合わせたモーダルを作成するために,prospには、プランデータが入っいる
const PlanContractModal = (props) => {
  // ログインしている時と、ログインしていない時で、モーダルを入れ替える
  const toggleModal = () => {
    if (props.loginUserYorozuId) {
      return <ModalContent />
    } else {
      return <LoginAttentionModal />
    }
  }
  return (
    <PlanDataContext.Provider value={props}>
      <Elements stripe={stripePromise}>{toggleModal()}</Elements>
    </PlanDataContext.Provider>
  )
}

const mapStateToProps = (state) => ({
  // リクエストの送り主(ログインしているユーザー)
  loginUserYorozuId: state.account.yorozuId,
  // よろずや名(ログインしているユーザー)
  // yorozuyaName: state.account.yorozuyaName,
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,
  // ログインユーザーのメールアドレス
  email: state.account.email,
})

const mapStateToDispatch = (dispatch) => ({
  // プランの契約をするときアクション
  planContractEvent: (contractData) => dispatch(planContract(contractData)),
  // プラン契約したきに、をプランオーナーにメールも送信する
  sendMessageEvent: (message) => dispatch(sendMessage(message)),
})

export default connect(mapStateToProps, mapStateToDispatch)(PlanContractModal)

// ====================================================================================================
// カードエレメントに関して 2020 7 11
// <CardElement />
// 上記のものを、記入するだけで、ユーザーが入力するカード番号のフォームなどが表示されるようになる
// ====================================================================================================

// ====================================================================================================
// useStripe()に関して 2020 7 14

//  <Elements stripe={stripePromise}>
//   この中でしか、wrapされたコンポーネントしたかuseStripeは使えない
// </Elements>

// ====================================================================================================
