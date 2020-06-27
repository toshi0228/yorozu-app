import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { checkMySentPlanContractStatus } from '../../../store/actions/planContract'
import PlanContractModal from './planContractModal'

const TogglePlanBtn = (props) => {
  console.log('TogglePlanBtn')
  console.log(props)

  // ログインユーザーのプランだった場合、「契約する」ボタンを押せないようにしたい
  const [isloginUserPlan, setIsLoginUserPlan] = useState(false)
  useEffect(() => {
    if (props.planOwnerYorozuId === props.loginUserYorozuId) {
      setIsLoginUserPlan(true)
    }
  }, [])

  // mySentPlanContractStatusAndPlanIdListはplanページのよろずやと契約しているプランが入っている
  // props.planDataで渡ってきたプランのidと契約したプランのIDが同じものを抽出する
  const loginUserContractPlan = props.mySentPlanContractStatusAndPlanIdList.find((ContractPlan) => {
    return ContractPlan.planId === props.planData.id
  })

  // 「契約をする」ボタンを押した時のモーダルの制御
  const [isPlanContractModalVisible, setIsPlanContractModalVisible] = useState(false)

  // 「契約をする」ボタンを押した時のアクション
  // isPlanRequestModalVisibleをの値がtureになると、モーダルが表示される
  const showPlanContractModal = () => {
    setIsPlanContractModalVisible(true)
  }

  // useEffectの第二の引数にプランのオーナーが変更したら、処理が走るようにしたいので,props.planOwnerYorozuIdを入れる
  // また、props.planOwnerYorozuIdが変更された後に、HTTPリクエストで自分が送信したプランリクエストを取得する場合もあるので
  // props.mySentPlanContractListが変更されたら、毎回ステータスを確認するようにする
  useEffect(() => {
    props.checkMySentPlanContractStatusEvent(props.planOwnerYorozuId)
  }, [props.planOwnerYorozuId, props.mySentPlanContractList])

  //   ログインユーザーが送ったプランの契約状態と、プランリクエストの状態でボタンを変える
  const togglePlanRequestBtn = () => {
    if (isloginUserPlan) {
      return (
        <>
          <Button type="primary" onClick={showPlanContractModal} disabled>
            ご自身のプランです
          </Button>
        </>
      )
    }

    // loginUserContractPlan.statusが最初,undifindでエラーになるので、try,catchを使う
    try {
      switch (loginUserContractPlan.status) {
        // ================================================================================
        // ログインしているユーザーがプラン契約リストを送っていて、さらによろず屋から承認を受けている場合
        // ================================================================================
        case 'planContractApproved':
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
        case 'planContractNotApproved':
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
      // ================================================================================
      // 契約を送っていない場合
      // ================================================================================
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
    }
  }

  return <>{togglePlanRequestBtn()}</>
}

const mapStateToProps = (state) => ({
  loginUserYorozuId: state.account.yorozuId,
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,
  // 自分が送った契約申請(本契約)の状態とplanId 1. 契約申請を送信してない 2.承認されていない 3.承認された
  mySentPlanContractStatusAndPlanIdList: state.planContract.mySentPlanContractStatusAndPlanId,
  // 自分が送信したプラン契約のリクエスト(本契約)。(実際にデータとして、使わないがこの取得した値が変化したら、内容を変更するようにする)
  mySentPlanContractList: state.planContract.mySentPlanContractList,
})

const mapStateToDispatch = (dispatch) => ({
  // プランページに移動した時に、ログインユーザーが契約申請を送信した事がある万屋か確認する
  checkMySentPlanContractStatusEvent: (planOwnerYorozuId) => dispatch(checkMySentPlanContractStatus(planOwnerYorozuId)),
})

export default connect(mapStateToProps, mapStateToDispatch)(TogglePlanBtn)
