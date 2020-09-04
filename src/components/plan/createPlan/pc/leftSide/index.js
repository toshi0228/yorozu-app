import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Popconfirm } from 'antd'

import styles from './index.module.scss'

// action
import { readEditPlan, readyCreatePlan, deletePlan } from '../../../../../store/actions/plan'

// ======================================================================
// 新規で登録するプランリストがここに入る
// ======================================================================

// planDataは、CreatePlanPageから渡ってくる
const RegisteredPlanList = ({ planData, readEditPlanEvent, readyCreatePlanEvent, deletePlanEvent }) => {
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
  // 削除ボタンを押した時の処理
  // ====================================================================
  const deletePlan = (plan) => {
    deletePlanEvent(plan.id)
  }

  // ====================================================================
  //  登録済みのプランリストを表示する
  // ====================================================================
  const planList = planData.map((plan, index) => {
    return (
      <Row className={styles.planCard} key={index}>
        {/* 画像 */}
        <Col onClick={() => editPlan(plan)}>
          <img src={plan.image} className={styles.planImage} />
        </Col>

        <Row>
          {/* タイトル/ 値段 18/ 24 */}
          <Col span={18} style={{ marginTop: 4 }}>
            {/* タイトル */}
            <h4 style={{ margin: 0 }}>{plan.title}</h4>

            {/* 値段 */}
            <div style={{ fontSize: 12 }}>{`¥${plan.price}円`}</div>
          </Col>

          {/* 削除ボタン 20/ 24  */}
          <Col offset={20} style={{ marginTop: 4 }}>
            <Popconfirm
              placement="topLeft"
              title="プランを削除してよろしいですか？"
              onConfirm={() => deletePlan(plan)}
              okText="はい"
              cancelText="いいえ"
            >
              <Button block={true} size="small">
                削除
              </Button>
            </Popconfirm>
          </Col>
        </Row>
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
  // プランを削除する
  deletePlanEvent: (planId) => dispatch(deletePlan(planId)),
})

export default connect(null, mapDispatchToProps)(RegisteredPlanList)
