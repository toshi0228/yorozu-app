import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Col } from 'antd'
import { SmileTwoTone, FrownOutlined } from '@ant-design/icons'

import { plusReview, minusReview } from '../../../../../store/actions/profile'
import { patchReviewEvent, checkMySentReview } from '../../../../../store/actions/review'
import styles from './index.module.scss'

const ReviewButton = ({
  data,
  loginUserYorozuId,
  planOwnerYorozuId,
  patchReviewEvent,
  plusReviewEvent,
  minusReviewEvent,
  checkMysentReviewEvent,
  mySentContract,

  reviewStatus,
}) => {
  // 自分がplanOwnerに送ったreviewに関して確認する
  useEffect(() => {
    const ownerYorozuId = planOwnerYorozuId.yorozuId
    checkMysentReviewEvent(ownerYorozuId)
  }, [planOwnerYorozuId.yorozuId])

  // 元に戻す時のreview情報
  const resetReviewInfo = {
    senderYorozuId: loginUserYorozuId,
    receiverYorozuId: planOwnerYorozuId.yorozuId,
    isPositiveScore: false,
    isNegativeScore: false,
  }

  const positiveReviewInfo = {
    senderYorozuId: loginUserYorozuId,
    receiverYorozuId: planOwnerYorozuId.yorozuId,
    isPositiveScore: true,
    isNegativeScore: false,
  }

  const negativeReviewInfo = {
    senderYorozuId: loginUserYorozuId,
    receiverYorozuId: planOwnerYorozuId.yorozuId,
    isPositiveScore: false,
    isNegativeScore: true,
  }

  // プラスレビューをすでにクリックしたことがあるなら、プラスにしていた分をマイナスにする
  const plusScore = () => {
    switch (reviewStatus) {
      // 一度プラスのレビューを押してる場合 (1, 0) => (0, 0)
      case 'positive':
        plusReviewEvent({ positiveScore: -1, negativeScore: 0 })
        patchReviewEvent(resetReviewInfo)
        return

      // 一度プラスマイナスのレビュー押してる場合 (0, 1) => (1, 0)
      case 'negative':
        plusReviewEvent({ positiveScore: 1, negativeScore: -1 })
        patchReviewEvent(positiveReviewInfo)
        return

      // まだレビュー押してない場合 (0, 0) => (1, 0)
      case 'default':
        plusReviewEvent({ positiveScore: 1, negativeScore: 0 })
        patchReviewEvent(positiveReviewInfo)
        return
    }
  }

  // マイナスレビューをクリックしたことがあるなら、マイナスしていた分を、プラスに戻す
  const minusScore = () => {
    switch (reviewStatus) {
      // 一度プラスのレビューを押してる場合 (1, 0) => (0, 1)
      case 'positive':
        plusReviewEvent({ positiveScore: -1, negativeScore: 1 })
        patchReviewEvent(negativeReviewInfo)
        return

      // 一度プラスマイナスのレビュー押してる場合 (0, 1) => (0, 0)
      case 'negative':
        plusReviewEvent({ positiveScore: 0, negativeScore: -1 })
        patchReviewEvent(resetReviewInfo)
        return

      // まだレビュー押してない場合 (0, 0) => (0, 1)
      case 'default':
        plusReviewEvent({ positiveScore: 0, negativeScore: 1 })
        patchReviewEvent(negativeReviewInfo)
        return
    }
  }

  const toggleReviewBtn = () => {
    //   契約したことがあるプランがあれば、isContractには値が入る
    const isContract = mySentContract.find((contractInfo) => {
      return 'planContractApproved' === contractInfo.status
    })

    // 契約したことがある場合だけ、reviewを押すことができる
    if (isContract) {
      return (
        <>
          <Col>
            <SmileTwoTone twoToneColor="#ff7d6e" style={{ fontSize: 16 }} onClick={() => plusScore()} />
            <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{data.profileDetail.score['positiveScore']}</span>
          </Col>
          <Col offset={3}>
            <FrownOutlined twoToneColor="#1890ff" style={{ color: '#1890ff', fontSize: 16 }} onClick={() => minusScore()} />
            <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{data.profileDetail.score['negativeScore']}</span>
          </Col>
        </>
      )
      //   契約しているプランがない場合
    } else {
      return (
        <>
          <Col>
            <SmileTwoTone twoToneColor="#ff7d6e" style={{ fontSize: 16 }} />
            {/* <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{data.profileDetail.score['positiveScore']}</span> */}
            <span className={styles.btn}>{data.profileDetail.score['positiveScore']}</span>
          </Col>
          <Col offset={3}>
            <FrownOutlined twoToneColor="#1890ff" style={{ color: '#1890ff', fontSize: 16 }} />
            <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{data.profileDetail.score['negativeScore']}</span>
          </Col>
        </>
      )
    }
  }

  return <>{toggleReviewBtn()}</>
}

const mapStateToProps = (state) => ({
  // プランページのよろずやに、契約申請を送ったことがあるか確認する
  mySentContract: state.planContract.mySentPlanContractStatusAndPlanId,
  loginUserYorozuId: state.account.yorozuId,
  planOwnerYorozuId: state.profile.profileDetail,
  // reviewStatusは、loginuserが高評価,低評価、評価ていないの3パターンある
  reviewStatus: state.review.reviewStatus,
})

// todo名前変更から 2020 7 3

const mapDispatchToProps = (dispatch) => ({
  plusReviewEvent: (num) => dispatch(plusReview(num)),
  minusReviewEvent: (num) => dispatch(minusReview(num)),
  // reviewの送信または上書きをする
  patchReviewEvent: (reviewData) => dispatch(patchReviewEvent(reviewData)),
  // ログインユーザーがplanOwnerに送ったreviewの状況を確認
  // idはloginUsetとplanownerのYorozuIDのオブジェクト
  checkMysentReviewEvent: (planOwnerYorozuId) => dispatch(checkMySentReview(planOwnerYorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewButton)

// ========================================================================
// patchReviewEventに関して 2020 7 3
// patchReviewEventでは、データがなければ、新しいデータを作るし、元からデータがあれば
// その上から上書きするようになっている
// つまり、loginUserは、planOwnerに一回のreviewしか送れない

// また、reviewに関しては、profileReducerとreviewReducerで扱っている
// model側、reviewはprofileとリレーションしているので、profileを呼び出せば
// reviewデータも呼ばれる。ただ、reviewを送信する時は、reviewモデルに送るので
// profilereducerとreviewReducerに送る処理に分かれている

// ========================================================================
