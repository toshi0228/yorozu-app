import React from 'react'
import { connect } from 'react-redux'
import { Col, Row, List, Button, Popconfirm } from 'antd'

import styles from './index.module.scss'

// action
import { readEditPlan, readyCreatePlan, removePlan } from '../../../../../store/actions/plan'

// ======================================================================
// 新規で登録するプランリストがここに入る モバイル用
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
  const listData = []

  planData.map((plan, index) => {
    const planData = {
      index: index,
      planInfo: plan,
      title: plan.title,
      planImage: plan.image,
      price: plan.price,
    }
    listData.push(planData)
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
      <List
        grid={{ gutter: 32, column: 3 }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <Row className={styles.planCard} key={item.index}>
              {/* 画像 */}
              <Col onClick={() => editPlan(item.planInfo)}>
                <img src={item.planImage} className={styles.planImage} />
              </Col>

              <Row>
                {/* タイトル/ 値段 18/ 24 */}
                <Col span={16} style={{ marginTop: 4 }}>
                  {/* タイトル */}
                  <h4 style={{ margin: 0 }}>{item.title}</h4>

                  {/* 値段 */}
                  <div style={{ fontSize: 12 }}>{`¥${item.price}円`}</div>
                </Col>

                {/* 削除ボタン 20/ 24  */}
                <Col offset={18} style={{ marginTop: 4 }}>
                  <Popconfirm
                    placement="topLeft"
                    title="プランを削除してよろしいですか？"
                    onConfirm={() => deletePlan(item.planInfo)}
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
          </List.Item>
        )}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  // 編集するプランを取得する
  readEditPlanEvent: (planId) => dispatch(readEditPlan(planId)),
  // 新規登録の作業なので、右側の入力項目を空白にする
  readyCreatePlanEvent: () => dispatch(readyCreatePlan()),
  // プランを削除する
  deletePlanEvent: (planId) => dispatch(removePlan(planId)),
})

export default connect(null, mapDispatchToProps)(RegisteredPlanList)
