import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import RightSide from '../../components/plan/createPlan/rightSide'
import LeftSide from '../../components/plan/createPlan/leftSide'

// action
import { feachProfileDetail } from '../../store/actions/profile'
import { finReadUpdatePlan } from '../../store/actions/plan'

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
      <Row style={{ marginTop: 32, marginBottom: 32 }}>
        <Col span={8}>
          <h4>どんなプランがあるのか、教えてください!!</h4>
        </Col>
      </Row>

      <Row>
        {/* プラン作成画面の左側のレイアウト */}
        <Col span={8}>
          <Row>
            {/* 右サイドと少し隙間を開けるために4/24分の隙間を開ける */}
            <Col span={20}>
              <LeftSide planData={planData} />
            </Col>
          </Row>
        </Col>

        {/* プラン作成画面の右側のレイアウト */}
        <Col style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }} span={16}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <RightSide yorozuId={yorozuId} registeredPlan={registeredPlan} />
            </Col>
          </Row>
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
