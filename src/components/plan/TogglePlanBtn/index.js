import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { checkMySentPlanRequestStatus } from '../../../store/actions/planRequest'
import { checkMySentPlanContractStatus } from '../../../store/actions/planContract'
import PlanRequestModal from './planRequestModal'
import PlanContractModal from './planContractModal'

// todo 送信したとの処理

const TogglePlanBtn = (props) => {
  // mySentPlanContractStatusAndPlanIdListはplanページのよろずやと契約しているプランが入っている
  // props.planDataで渡ってきたプランのidと契約したプランのIDが同じものを抽出する
  const loginUserContractPlan = props.mySentPlanContractStatusAndPlanIdList.find((ContractPlan) => {
    return ContractPlan.planId === props.planData.id
  })
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
    props.checkMySentPlanContractStatusEvent(props.planOwnerYorozuId)
  }, [props.planOwnerYorozuId, props.mySentPlanRequestList, props.mySentPlanContractList])

  //   ログインユーザーが送ったプランの契約状態と、プランリクエストの状態でボタンを変える
  const togglePlanRequestBtn = () => {
    // loginUserContractPlanがudifuneの場合があるので、tryを使う
    // ================================================================================
    // ログインしているユーザーがプラン契約リストを送っていて、さらによろず屋から承認を受けている場合
    // ================================================================================
    try {
      if (loginUserContractPlan.status === 'planContractApproved') {
        return (
          <>
            <Button type="primary" onClick={showPlanContractModal} disabled>
              契約中のプランです
            </Button>
            <PlanContractModal
              isPlanContractModalVisible={isPlanContractModalVisible}
              setIsPlanContractModalVisible={setIsPlanContractModalVisible}
              planData={props.planData}
            />
          </>
        )
        // ================================================================================
        // ログインしているユーザーがプラン契約リストを送っていて、ろず屋から承認待ちの場合
        // ================================================================================
      } else if (loginUserContractPlan.status === 'planContractNotApproved') {
        return (
          <>
            <Button type="primary" onClick={showPlanContractModal} disabled>
              プランの承認待ちの状態です
            </Button>
            <PlanContractModal
              isPlanContractModalVisible={isPlanContractModalVisible}
              setIsPlanContractModalVisible={setIsPlanContractModalVisible}
              planData={props.planData}
            />
          </>
        )
      }
    } catch {
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
  }

  return <>{togglePlanRequestBtn()}</>
}

const mapStateToProps = (state) => ({
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,

  // 自分が送ったプランリクエスト(仮契約)の状態 1. プランリクエストを送信してない 2.承認されていない 3.承認された
  mySentPlanRequestStatus: state.planRequest.mySentPlanRequestStatus,
  // 自分が送った契約申請(本契約)の状態とplanId 1. 契約申請を送信してない 2.承認されていない 3.承認された
  mySentPlanContractStatusAndPlanIdList: state.planContract.mySentPlanContractStatusAndPlanId,

  // 自分が送信したプラン契約のリクエスト(本契約)。(実際にデータとして、使わないがこの取得した値が変化したら、内容を変更するようにする)
  mySentPlanContractList: state.planContract.mySentPlanContractList,
  // 自分が送信したプランリクエスト(実際にデータとして、使わないがこの取得した値が変化したら、内容を変更するようにする)
  mySentPlanRequestList: state.planRequest.mySentPlanRequestList,
})

const mapStateToDispatch = (dispatch) => ({
  // プランページに移動した時に、ログインユーザーがプランリクエストを送信した事がある万屋か確認する
  // (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
  checkMySentPlanRequestStatusEvent: (planOwnerYorozuId) => dispatch(checkMySentPlanRequestStatus(planOwnerYorozuId)),
  // プランページに移動した時に、ログインユーザーが契約申請を送信した事がある万屋か確認する
  checkMySentPlanContractStatusEvent: (planOwnerYorozuId) => dispatch(checkMySentPlanContractStatus(planOwnerYorozuId)),
})

export default connect(mapStateToProps, mapStateToDispatch)(TogglePlanBtn)
