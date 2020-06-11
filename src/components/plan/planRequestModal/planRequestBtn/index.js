import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { checkMySentPlanRequestStatus } from '../../../../store/actions/planRequest'

const PlanRequestBtn = (props) => {
  console.log('PlanRequestBtn')
  console.log(props)

  // リクエストを送るボタンを押した時のアクション
  // setIsVisibleをの値がtureになると、モーダルが表示される
  const showModal = () => {
    props.setIsVisible(true)
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
          <Button type="primary" onClick={showModal}>
            契約をする
          </Button>
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
          <Button type="primary" onClick={showModal}>
            リクエストを送る
          </Button>
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

export default connect(mapStateToProps, mapStateToDispatch)(PlanRequestBtn)
