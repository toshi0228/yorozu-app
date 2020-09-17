import React from 'react'
import { connect } from 'react-redux'

// stripe
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Row, Col, Button } from 'antd'

import { registerdCard } from '../../store/actions/payment'

const Payment = ({ account, registerdCardEvent }) => {
  // useStripeを使うことでストライプ側に情報を送信できる
  const stripe = useStripe()

  // カード情報を入力した値を取得するhooks?
  const elements = useElements()

  const registerd = async () => {
    // stripe側で、準備ができていなければエラーになる
    if (!stripe || !elements) {
      return
    }

    // elements.getElement(CardElement)は、引数にCardElementを入れることでカード情報を取得する？
    const cardElement = elements.getElement(CardNumberElement)

    // //Stripeに、カード情報を送っているのかな。cardElementに入力してあるカード情報が不正なものでないか確認している?
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    // うまく言えば、errorはundifinedになるので、以下のように書く
    if (error) {
      console.log('[error]', error)
      return
    }

    console.log(paymentMethod)
    const paymentMethodId = paymentMethod.id

    // registerdCardEvent('aa')
  }

  const cardOptions = {
    style: {
      base: {
        iconStyle: 'solid',
        padding: '10px',
        borderBottom: 'solid 3px #cfd7df',
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '16px',
        marign: '20px',
        '::placeholder': {
          color: '#CCCCCC',
        },
      },
    },
  }

  return (
    <>
      {/* 説明 */}
      <Row>
        <img style={{ height: 32 }} src="https://yourozu.s3-ap-northeast-1.amazonaws.com/stripeImage.png" />
        <div style={{ marginTop: 8 }}>※ご利用頂けるカードは、上記のカードです。</div>
      </Row>

      {/* カード番号の入力 */}
      <Row>
        <Col style={{ marginTop: 40 }}>
          <span>カード番号</span>
        </Col>
        <Col style={{ marginBottom: '10px', padding: '6px', borderBottom: 'solid 0.3px #cfd7df' }}>
          <CardNumberElement options={cardOptions} style={{ fontSize: 16 }} />
        </Col>
      </Row>

      <Row type="flex" justify="space-between">
        {/* 左側 */}
        <Col style={{ height: 72 }} span={10}>
          {/* <div style={{ paddingRight: '155px' }}>有効期限</div> */}
          <Row>
            <Col>
              <div>有効期限</div>
            </Col>
            <Col style={{ padding: '6px', borderBottom: 'solid 0.3px #cfd7df' }}>
              <CardExpiryElement options={cardOptions} />
            </Col>
          </Row>
        </Col>
        {/* 右側 */}
        <Col style={{ height: 72 }} span={10}>
          <Row>
            <Col>
              <div>CVCコード</div>
            </Col>
            <Col style={{ padding: '6px', borderBottom: 'solid 0.3px #cfd7df' }}>
              <CardCvcElement options={cardOptions} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col style={{ marginTop: 24 }}>
          クレジットカードの決済に関しては、stripeを使っています。クレジットカードの情報は自社で管理せず、決済会社のStripe社で安全に管理されております。
        </Col>
      </Row>

      {/* ボタン */}
      <Row type="flex" justify="end">
        <Col style={{ marginTop: 32, marginBottom: 32 }}>
          {/* <Button size="large" type="primary" onClick={() => registerd()}> */}
          <Button size="large" type="primary" onClick={registerd}>
            保存する
          </Button>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  account: state.account,
})

const mapDispatchToProps = (dispatch) => ({
  // クレジットカード情報を登録する
  registerdCardEvent: (accountInfo) => dispatch(registerdCard(accountInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
