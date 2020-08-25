import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import styles from './index.module.scss'

// action
import { readEditPlan, readyCreatePlan } from '../../../../../store/actions/plan'

// ======================================================================
// 新規で登録するプランリストがここに入る
// ======================================================================

// planDataは、CreatePlanPageから渡ってくる
const RegisteredPlanList = ({ planData, readEditPlanEvent, readyCreatePlanEvent }) => {
  // ====================================================================
  // 登録済みのプランを選んだ時に処理 選択することによって右側の編集項目がでる
  // ====================================================================
  const editPlan = (planItem) => {
    readEditPlanEvent(planItem)
  }

  // ====================================================================
  // プランの新規登録ボタンを押した時、右側の入力項目を白紙にする
  // ====================================================================
  const readyCreatePlan = () => {
    readyCreatePlanEvent()
  }

  // ====================================================================
  //  登録済みのプランリストを表示する
  // ====================================================================
  const planList = planData.map((plan, index) => {
    return (
      <Row className={styles.planCard} key={index}>
        <Col onClick={() => editPlan(plan)}>
          <img src={plan.image} className={styles.planImage} />
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
      <Row type="flex" justify="center" className={styles.newRegister} onClick={() => readyCreatePlan()}>
        <Col>
          <div className={styles.plus}>+</div>
          新規登録
        </Col>
      </Row>

      {/* 登録したプランリストが並ぶ */}
      {planList}
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  // 編集するプランを取得する
  readEditPlanEvent: (planId) => dispatch(readEditPlan(planId)),
  // 新規登録の作業なので、右側の入力項目を空白にする
  readyCreatePlanEvent: () => dispatch(readyCreatePlan()),
})

export default connect(null, mapDispatchToProps)(RegisteredPlanList)
