import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import styles from './index.module.scss'
import host from '../../../../constants/url'

// ======================================================================
// 新規で登録するプランリストがここに入る
// ======================================================================

// yorozuId, planDataは、CreatePlanPageから渡ってくる
const RegisteredPlanList = ({ yorozuId, planData }) => {
  console.log('RegisteredPlanList')
  console.log(planData)
  console.log(yorozuId)

  const planList = planData.map((plan, index) => {
    //  登録済みのプランリスト
    return (
      <Row className={styles.planCard} key={index}>
        <Col>
          <img src={`${host.localhost()}${plan.image}`} className={styles.planImage} />
        </Col>
        <Col style={{ marginTop: 4 }}>
          <h4 style={{ margin: 0 }}>{plan.title}</h4>
        </Col>
        <Col style={{ fontSize: 12 }}>{`¥${plan.price}円`}</Col>
      </Row>
    )
  })

  return (
    <>
      {/* プランの新規登録ボタン */}
      <Row type="flex" justify="center" className={styles.newRegister}>
        <Col>
          <div className={styles.plus}>+</div>
          新規登録
        </Col>
      </Row>

      {planList}

      <Row style={{ marginTop: 32 }}>
        <Col>
          <img src="https://i.pinimg.com/originals/85/a6/92/85a692a199ae0a0c8b29430bdf72afdc.jpg" className={styles.planImage} />
        </Col>

        <Col style={{ marginTop: 4 }}>
          <h4 style={{ margin: 0 }}>タイトルの長いプランンンンンんn</h4>
        </Col>
        <Col style={{ fontSize: 12 }}>12000円</Col>
      </Row>
    </>
  )
}

export default connect()(RegisteredPlanList)
