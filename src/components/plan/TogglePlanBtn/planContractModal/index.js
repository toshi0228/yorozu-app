import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Row, Col } from 'antd'
import { planContract } from '../../../../store/actions/planContract'
import { sendMessage } from '../../../../store/actions/message'

// import StripeCheckoutButton from '../../../stripeButton'
import Stripe from '../../../stripe'

// import host from '../../../../constants/url'
// import styles from './index.module.scss'

import PlanDataContext from '../../../../contexts/PlanDataContext'

// ====================================================================
// プランリクエストのモーダル
// ====================================================================

const PlanContractModal = (props) => {
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ContractDataは、プランのリクエストの時に必要な情報
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const ContractData = {
    // リクエストの送り主(ログインしているユーザー)
    senderYorozuId: props.loginUserYorozuId,
    // リクエストの送り先のユーザー(プランオーナーのyorozuId)
    receiverYorozuId: props.planOwnerYorozuId,
    // 契約するプランのID
    contractPlan: props.planData.id,
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // モーダルの中での送信ボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const hundleSubmit = () => {
    // プランのリクエストの処理
    props.planContractEvent(ContractData)

    // 送信ボタンを押したらモダールを閉じる
    props.setIsPlanContractModalVisible(false)

    const messageData = {
      senderYorozuId: props.loginUserYorozuId,
      receiverYorozuId: props.planOwnerYorozuId,
      messageContent: '契約の承認をお願いします(クライアントが契約を申請した時に、自動で送信されるメッセージです)',
    }
    // 契約を押した時に、プランオーナーにメッセージも送る。相手は、メッセージ画面からプランの承認を押すことができる
    props.sendMessageEvent(messageData)
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // モーダルの中でのキャンセルボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const handleCancel = () => {
    props.setIsPlanContractModalVisible(false)
  }

  return (
    // <PlanDataContext.Provider value={'hellow I am provider'}>
    <PlanDataContext.Provider value={props}>
      <Stripe price={props.planData.price} hundleSubmit={hundleSubmit} />
      {/* <div>
        <Modal
          title="お支払い方法の選択"
          // visiblがtrueなら、モーダルが表示される
          visible={props.isPlanContractModalVisible}
          onOk={hundleSubmit}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" onClick={hundleSubmit}>
              クレジットカードで決済
            </Button>,
          ]}
        >
          <Stripe price={props.planData.price} hundleSubmit={hundleSubmit} />
        </Modal>
      </div> */}
    </PlanDataContext.Provider>
  )
}

const mapStateToProps = (state) => ({
  // リクエストの送り主(ログインしているユーザー)
  loginUserYorozuId: state.account.yorozuId,
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,
})

const mapStateToDispatch = (dispatch) => ({
  // プランの契約をするときアクション
  planContractEvent: (contractData) => dispatch(planContract(contractData)),
  // プラン契約したきに、をプランオーナーにメールも送信する
  sendMessageEvent: (message) => dispatch(sendMessage(message)),
})

export default connect(mapStateToProps, mapStateToDispatch)(PlanContractModal)
