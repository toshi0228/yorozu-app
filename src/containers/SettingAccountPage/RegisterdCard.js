import React from 'react'
import { Row, Col } from 'antd'

// Component
import CardForm from '../../components/stripe/cardForm'
import styles from '../../styles/RegisterdCard.module.scss'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// クレジットカードの登録ページ
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const RegisterdCard = ({ email }) => {
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

export default RegisterdCard
