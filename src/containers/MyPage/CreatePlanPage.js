import React, { useEffect, Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

// action
import { feachProfileDetail } from '../../store/actions/profile'
import { finReadUpdatePlan } from '../../store/actions/plan'

// Component
// pc用  components
import RightSide from '../../components/plan/createPlan/pc/rightSide'
import LeftSide from '../../components/plan/createPlan/pc/leftSide'
// mobile用 componetns
import InputPlan from '../../components/plan/createPlan/mobile/inputPlan'
import RegisteredPlanList from '../../components/plan/createPlan/mobile/RegisteredPlanList'

const CreatePlanPage = ({ yorozuId, planData, registeredPlan, isUpdatePlan, readUpdatePlanEvent, finReadUpdatePlanEvent }) => {
  // プランが更新されたら、プロフィールを更新する。プロフィールにはプランが紐づいているので、更新されたプランが取得できる
  useEffect(() => {
    // if文を使うことでisUpdatePlanで更新された時だけ変化する
    // もし書かない場合、isUpdatePlanがturuからfalseに変更された時も更新処理が動いてしまう
    if (isUpdatePlan) {
      readUpdatePlanEvent(yorozuId)
      finReadUpdatePlanEvent()
    }
  }, [isUpdatePlan])

  return (
    <>
      <Row>
        {/* pc用 */}
        <Col xs={0} md={0} lg={8} style={{ marginTop: 32, marginBottom: 32 }}>
          <h4>どんなプランがあるのか、教えてください!!</h4>
        </Col>
        {/* ipad用 タブとの空白があるだけ */}
        <Col xs={0} md={22} lg={0} style={{ marginTop: 32, marginBottom: 32 }}></Col>
      </Row>
      {/* PC レイアウト */}
      <Row>
        {/* プラン作成画面の左側のレイアウト */}
        <Col xs={0} md={0} lg={7}>
          <LeftSide planData={planData} />
        </Col>

        {/* pcの時の、右と左をわける空白 */}
        <Col xs={0} md={0} lg={1}></Col>

        {/* プラン作成画面の右側のレイアウト */}
        <Col xs={0} md={0} lg={16} style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <RightSide yorozuId={yorozuId} registeredPlan={registeredPlan} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* スマホ レイアウト */}
      <Row type="flex" justify="center">
        <Col xs={24} md={0}>
          <InputPlan yorozuId={yorozuId} registeredPlan={registeredPlan} />
        </Col>

        <Col xs={24} md={0}>
          <h4 style={{ textAlign: 'center', marginTop: 80 }}>◆作成・編集するプランをタップしてください◆</h4>
          <p style={{ textAlign: 'center', fontSize: 12 }}>タップすると、登録したプラン内容が入力項目に表示されます</p>
        </Col>

        <Col xs={24} md={0} style={{ marginTop: 32 }}>
          <RegisteredPlanList planData={planData} />
        </Col>
      </Row>

      {/* ipad用 レイアウト */}
      <Row type="flex" justify="center">
        {/* プラン作成画面の右側のレイアウト */}
        <Col xs={0} md={24} lg={0} style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <RightSide yorozuId={yorozuId} registeredPlan={registeredPlan} />
            </Col>
          </Row>
        </Col>

        <Col xs={0} md={24} lg={0}>
          <h4 style={{ textAlign: 'center', marginTop: 80 }}>◆作成・編集するプランをタップしてください◆</h4>
          <p style={{ textAlign: 'center', fontSize: 12 }}>タップすると、登録したプラン内容が入力項目に表示されます</p>
        </Col>

        <Col xs={0} md={24} lg={0} style={{ marginTop: 32 }}>
          <RegisteredPlanList planData={planData} />
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  yorozuId: state.account.yorozuId,
  // ユーザーが登録しているプランリストが入ってくる
  planData: state.profile.profileDetail['planList'],
  // 現在登録しているプラン項目をinputの所に表示させる(プランを編集する時に使う)
  registeredPlan: state.plan.registeredPlan,
  // プランが更新されたTrueになる
  isUpdatePlan: state.plan.isUpdatePlan,
})

const mapDispatchToProps = (dispatch) => ({
  // updateされたプランを読み込むのだが、実際はprofileを読み込む。profileには、プランも含まれているから
  readUpdatePlanEvent: (yorozuId) => dispatch(feachProfileDetail(yorozuId)),
  // readUpdatePlanEventでプランを取得したら、isUpdatePlan: falseにする
  finReadUpdatePlanEvent: () => dispatch(finReadUpdatePlan()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanPage)
