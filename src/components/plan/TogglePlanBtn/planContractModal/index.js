import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Row, Col } from 'antd'
import { planContract } from '../../../../store/actions/planContract'
import { sendMessage } from '../../../../store/actions/message'

import StripeCheckoutButton from '../../../stripeButton'

import host from '../../../../constants/url'
import styles from './index.module.scss'

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
    <div>
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
        <Row>
          {/* 説明 */}
          <Col span={14}>
            <h3>タイトル</h3>
            <p>{props.planData.title}</p>
            <h3>料金</h3>
            <p>{`￥${props.planData.price} 円`}</p>
            <h3>決済方法</h3>
            <p>
              クレジットカード<span style={{ padding: 30, color: '#1890ff', cursor: 'pointer', fontSize: 10 }}>変更する</span>
            </p>
            <StripeCheckoutButton />
          </Col>

          {/* 画像 */}
          <Col span={8} offset={2} style={{ background: '#ff7d6e' }}>
            <img alt="example" src={`${host.localhost()}${props.planData.image}`} style={{ width: '100%', height: 110, borderRadius: 8 }} />
          </Col>
        </Row>

        <h3 style={{ color: '#ff7d6e' }}>注意事項</h3>
        <div style={{ marginBottom: 20 }} className={styles.attention}>
          <ul>
            <li>解約は自由に行なえますが、課金後の返金は行っておりません。</li>
          </ul>
          <ul>
            <li>毎月の契約は契約日から1ヶ月となります。例えば5/20に契約すると次回は6/20の更新となります。</li>
          </ul>
          <ul>
            <li>契約がつづく限り、毎月自動で課金が行われます。</li>
          </ul>
          <ul>
            <li>初回契約にかぎり、48時間以内によろずやから返答がない場合は自動キャンセル・返金となります。</li>
          </ul>
        </div>
        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </div>
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
