import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Button } from 'antd'
import { CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { payment } from '../../../store/actions/payment'
import PaymentForm from '../paymentForm'

import PlanDataContext from '../../../contexts/PlanDataContext'
import { planContract } from '../../../store/actions/planContract'
import host from '../../../constants/url'
import styles from './index.module.scss'

const CheckoutForm = ({ price, paymentEvent }) => {
  //   console.log(PlanDataContext)

  // planContractModalにpropsで受け取るplanDataを読み込む
  const props = useContext(PlanDataContext)

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
  const planContract = () => {
    console.log('もだる')
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

  // useStripeを使うことでストライプ側に情報を送信できる
  const stripe = useStripe()
  console.log('stripe')
  console.log(stripe)

  // カード情報を入力した値を取得するhooks?
  const elements = useElements()

  const handleSubmit = async (event) => {
    console.log('カード')
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
      planContract()
    } else {
      console.log('うまく行かない')
    }
  }

  return (
    <>
      <Modal
        title="お支払い方法の選択"
        // visiblがtrueなら、モーダルが表示される
        visible={props.isPlanContractModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={handleSubmit}>
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
            <h3>お支払い方法</h3>
            <p>
              <img src="https://d2aj9sy12tbpym.cloudfront.net/javascripts/dist/assets/cards-93fdb7f8c04e768123771a8f33e49f63.svg" />
            </p>
          </Col>

          {/* 画像 */}
          <Col span={8} offset={2} style={{ background: '#ff7d6e' }}>
            <img alt="example" src={`${host.localhost()}${props.planData.image}`} style={{ width: '100%', height: 110, borderRadius: 8 }} />
          </Col>
        </Row>

        <PaymentForm />

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
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  paymentEvent: (token) => dispatch(payment(token)),
})

export default connect(null, mapDispatchToProps)(CheckoutForm)

// export default CheckoutForm
