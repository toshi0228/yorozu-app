import React from 'react'
import { Row, Col } from 'antd'

import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

const CreditCardForm = () => {
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
      <span>カード番号</span>
      <div style={{ marginBottom: '10px', padding: '6px', borderBottom: 'solid 0.3px #cfd7df' }}>
        <CardNumberElement options={cardOptions} style={{ fontSize: 16 }} />
      </div>

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

      {/* <div style={{ marginBottom: '10px', display: 'flex' }}>
        有効期限Container
        <div style={{ borderBottom: 'solid 0.3px #cfd7df' }}>
          <div style={{ paddingRight: '155px' }}>有効期限</div>
          <div style={{ padding: '6px' }}>
            <CardExpiryElement options={cardOptions} />
          </div>
        </div>

        CSVコードのContainer
        <div style={{ paddingRight: '35%', marginLeft: '5%', borderBottom: 'solid 0.3px #cfd7df' }}>
          <span>CVCコード</span>
          <div style={{ padding: '6px' }}>
            <CardCvcElement options={cardOptions} />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default CreditCardForm
