import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { checkMySentPlanRequestStatus } from '../../../store/actions/planRequest'
import PlanRequestModal from './planRequestModal'
import PlanContractModal from './planContractModal'

const TogglePlanRequestBtn = (props) => {
  // 「リクエストを送るボタン」を押したときのモーダルの制御
  const [isPlanRequestModalVisible, setIsPlanRequestModalVisible] = useState(false)
  // 「契約をする」ボタンを押した時のモーダルの制御
  const [isPlanContractModalVisible, setIsPlanContractModalVisible] = useState(false)

  // 「リクエストを送るボタン」を押した時のアクション
  // isPlanRequestModalVisibleをの値がtureになると、モーダルが表示される
  const showPlanRequestModal = () => {
    setIsPlanRequestModalVisible(true)
  }

  // 「契約をする」ボタンを押した時のアクション
  const showPlanContractModal = () => {
    setIsPlanContractModalVisible(true)
  }

  // プランページに移動した時に、ログインユーザーのプランリクエストの状態を確認する
  // (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
  // useEffectの第二の引数にプランのオーナーが変更したら、処理が走るようにしたいので,props.planOwnerYorozuIdを入れる
  // また、props.planOwnerYorozuIdが変更された後に、HTTPリクエストで自分が送信したプランリクエストを取得する場合もあるので
  // props.mySendPlanRequestListが変更されたら、毎回ステータスを確認するようにする
  useEffect(() => {
    props.checkMySentPlanRequestStatusEvent(props.planOwnerYorozuId)
  }, [props.planOwnerYorozuId, props.mySendPlanRequestList])

  //   ログインユーザーが送ったプランリクエスtの状態で、プランリクエストのボタンが変わる
  const togglePlanRequestBtn = () => {
    switch (props.mySentPlanRequestStatus) {
      // ================================================================================
      // ログインしているユーザーがプランリクエストを送っていて、さらによろず屋から承認を受けている場合
      // ================================================================================
      case 'planRequestApproved':
        return (
          <>
            <Button type="primary" onClick={showPlanContractModal}>
              契約をする
            </Button>
            <PlanContractModal
              isPlanContractModalVisible={isPlanContractModalVisible}
              setIsPlanContractModalVisible={setIsPlanContractModalVisible}
              planData={props.planData}
            />
          </>
        )

      // ================================================================================
      // ログインしているユーザーがプランリクエストを送ったが、まだよろずやから承認を受けていない場合
      // ================================================================================
      case 'planRequestNotApproved':
        return (
          <Button type="primary" disabled>
            プランリクエストの承認中
          </Button>
        )
      // ================================================================================
      // プランリクエストを送っていない場合
      // ================================================================================
      case 'notSentPlanRequest':
        return (
          <>
            <Button type="primary" onClick={showPlanRequestModal}>
              リクエストを送る
            </Button>
            <PlanRequestModal
              isPlanRequestModalVisible={isPlanRequestModalVisible}
              setIsPlanRequestModalVisible={setIsPlanRequestModalVisible}
            />
          </>
        )
    }
  }

  return <>{togglePlanRequestBtn()}</>
}

const mapStateToProps = (state) => ({
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,
  // 自分が送信したプランリクエスト(実際にデータとして、使わないがこの取得した値が変化したら、内容を変更するようにする)
  mySendPlanRequestList: state.planRequest.mySendPlanRequestList,
  // 自分が送ったプランリクエストの状態 1. プランリクエストを送信してない 2.承認されていない 3.承認された
  mySentPlanRequestStatus: state.planRequest.mySentPlanRequestStatus,
})

const mapStateToDispatch = (dispatch) => ({
  // プランページに移動した時に、ログインユーザーがプランリクエストを送信した事がある万屋か確認する
  // (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
  checkMySentPlanRequestStatusEvent: (planOwnerYorozuId) => dispatch(checkMySentPlanRequestStatus(planOwnerYorozuId)),
})

export default connect(mapStateToProps, mapStateToDispatch)(TogglePlanRequestBtn)
