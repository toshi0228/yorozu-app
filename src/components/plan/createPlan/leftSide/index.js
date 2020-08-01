import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import styles from './index.module.scss'
import host from '../../../../constants/url'

// action
import { readEditPlan } from '../../../../store/actions/plan'

// ======================================================================
// 新規で登録するプランリストがここに入る
// ======================================================================

// planDataは、CreatePlanPageから渡ってくる
const RegisteredPlanList = ({ planData, readEditPlanEvent }) => {
  // ====================================================================
  // 登録済みのプランを選んだ時に処理 選択することによって右側の編集項目がでる
  // ====================================================================
  const editPlan = (planItem) => {
    readEditPlanEvent(planItem)
  }

  // ====================================================================
  //  登録済みのプランリストを表示する
  // ====================================================================
  const planList = planData.map((plan, index) => {
    return (
      <Row className={styles.planCard} key={index}>
        <Col onClick={() => editPlan(plan)}>
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
      <Row type="flex" justify="center" className={styles.newRegister} onClick={() => editPlan()}>
        <Col>
          <div className={styles.plus}>+</div>
          新規登録
        </Col>
      </Row>

      {/* 登録したプランリストが並ぶ */}
      {planList}

      <Row style={{ marginTop: 32 }}>
        <Col onClick={() => console.log('押された')}>
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

const mapDispatchToProps = (dispatch) => ({
  // 編集するプランを取得する
  readEditPlanEvent: (planId) => dispatch(readEditPlan(planId)),
})

export default connect(null, mapDispatchToProps)(RegisteredPlanList)
