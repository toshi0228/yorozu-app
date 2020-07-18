import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Button } from 'antd'
import { CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { payment } from '../../../../../store/actions/payment'
import CreditCardForm from '../../../../form/creditCardForm'
import PlanDataContext from '../../../../../contexts/PlanDataContext'
import host from '../../../../../constants/url'

import styles from './index.module.scss'

const ModalContent = ({ paymentEvent }) => {
  const [cardErrorMessage, setCardErrorMessage] = useState('')
  const [isCardErrorMessage, isSetCardErrorMessage] = useState(false)

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // planContractModalにpropsで受け取るplanDataを読み込む
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
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
  // 購入情報をContractモデルに登録
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  const planContract = () => {
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
  // モーダルの中での送信ボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // useStripeを使うことでストライプ側に情報を送信できる
  const stripe = useStripe()

  // カード情報を入力した値を取得するhooks?
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // 決済処理？ 必要なのは、カード決済ということと、クレジットカードの値？
    // elements.getElement(CardElement)は、引数にCardElementを入れることでカード情報を取得する？
    // カード情報のみ先に、stripe側に送信する
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: props.email,
      },
      //   card: elements.getElement(CardElement),
    })

    // うまく言えば、エラーはundifinedになるので、以下のように書く
    if (!error) {
      const { id } = paymentMethod
      // paymentEvent => stripeのための決済処理をサーバー側で行う
      // paymentEvent({ id, price })
      const price = props.planData.price
      const title = props.planData.title
      const email = props.email
      paymentEvent({ id, price, title, email })

      // planContract => 誰が、誰の、どのプランを購入したかをサーバー側で管理する
      planContract()
    } else {
      isSetCardErrorMessage(true)
      setCardErrorMessage(`${error.message}もう一度ご確認ください。`)
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // モーダルの中でのキャンセルボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const handleCancel = () => {
    props.setIsPlanContractModalVisible(false)
  }

  return (
    <>
      <Modal
        title="お支払い方法の選択"
        // visiblがtrueなら、モーダルが表示される
        visible={props.isPlanContractModalVisible}
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

        {/* 失敗した時のエラーメッセージ */}
        {isCardErrorMessage && <p style={{ color: 'red', fontSize: '10px' }}>{cardErrorMessage}</p>}
        {/* クレジットカードの情報を入力 */}
        <CreditCardForm />

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

export default connect(null, mapDispatchToProps)(ModalContent)

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
