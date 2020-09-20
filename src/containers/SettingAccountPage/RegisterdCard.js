import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

// Component
import CardForm from '../../components/stripe/cardForm'
import styles from '../../styles/RegisterdCard.module.scss'

// action
import { fetchPayment } from '../../store/actions/payment'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// クレジットカードの登録ページ
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const RegisterdCard = ({ payment, authToken, readPaymentEvent }) => {
  useEffect(() => {
    readPaymentEvent(authToken)
  }, [])

  return (
    <div className={styles.RegisterdCardWrap}>
      <Row type="flex" justify="center" style={{ marginTop: 48 }}>
        <Col>
          <h2>カード情報</h2>
        </Col>
      </Row>

      <Row type="flex" justify="center" style={{ marginTop: 32 }}>
        <Col span={12} style={{ border: 'solid 1px #d5d5d5', borderRadius: '8px' }}>
          {/* // Row,Colのイメージは,入力項目は、一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <CardForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  // stripe決済情報
  payment: state.payment,
  // account(サーバーサイトのstripe情報を取得する時に必要)
  authToken: state.account.authToken,
})

const mapDispatchToProps = (dispatch) => ({
  readPaymentEvent: (authToken) => dispatch(fetchPayment(authToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterdCard)
