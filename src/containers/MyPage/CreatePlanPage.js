import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import RightSide from '../../components/plan/createPlan/rightSide'
import LeftSide from '../../components/plan/createPlan/leftSide'

const CreatePlanPage = ({ yorozuId, planData, registeredPlan }) => {
  return (
    <>
      <Row style={{ marginTop: 32, marginBottom: 32 }}>
        <Col span={8}>
          <h4>どんなプランがあるのか、教えてください!!</h4>
        </Col>
      </Row>

      <Row>
        {/* プラン作成画面の右側のレイアウト */}
        <Col span={8}>
          <Row>
            {/* 右サイドと少し隙間を開けるために4/24分の隙間を開ける */}
            <Col span={20}>
              <LeftSide yorozuId={yorozuId} planData={planData} />
            </Col>
          </Row>
        </Col>

        {/* プラン作成画面の左側のレイアウト */}
        <Col style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }} span={16}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <RightSide yorozuId={yorozuId} planData={planData} registeredPlan={registeredPlan} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  yorozuId: state.account.yorozuId,
  planData: state.profile.profileDetail['planList'],
  // 現在登録しているプラン項目をinputの所に表示させる
  registeredPlan: state.plan.registeredPlan,
})

export default connect(mapStateToProps, null)(CreatePlanPage)
