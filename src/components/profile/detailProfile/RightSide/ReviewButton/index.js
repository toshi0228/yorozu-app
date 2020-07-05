import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Col } from 'antd'
import { SmileTwoTone, FrownOutlined } from '@ant-design/icons'

import { changeReviewScore } from '../../../../../store/actions/review'
import { patchReviewEvent, checkMySentReview } from '../../../../../store/actions/review'
import styles from './index.module.scss'

const ReviewButton = ({
  data,
  loginUserYorozuId,
  planOwnerYorozuId,
  patchReviewEvent,
  changeScoreEvent,
  checkMysentReviewEvent,
  mySentContract,
  reviewScore,
  reviewStatus,
}) => {
  // 自分がplanOwnerに送ったreviewに関して確認する
  useEffect(() => {
    const loginUserId = loginUserYorozuId
    const ownerId = planOwnerYorozuId.yorozuId
    checkMysentReviewEvent({ ownerId, loginUserId })
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
        changeScoreEvent({ positiveScore: -1, negativeScore: 0 })
        patchReviewEvent(resetReviewInfo)
        return

      // 一度プラスマイナスのレビュー押してる場合 (0, 1) => (1, 0)
      case 'negative':
        changeScoreEvent({ positiveScore: 1, negativeScore: -1 })
        patchReviewEvent(positiveReviewInfo)
        return

      // まだレビュー押してない場合 (0, 0) => (1, 0)
      case 'default':
        changeScoreEvent({ positiveScore: 1, negativeScore: 0 })
        patchReviewEvent(positiveReviewInfo)
        return
    }
  }

  // マイナスレビューをクリックしたことがあるなら、マイナスしていた分を、プラスに戻す
  const minusScore = () => {
    switch (reviewStatus) {
      // 一度プラスのレビューを押してる場合 (1, 0) => (0, 1)
      case 'positive':
        changeScoreEvent({ positiveScore: -1, negativeScore: 1 })
        patchReviewEvent(negativeReviewInfo)
        return

      // 一度プラスマイナスのレビュー押してる場合 (0, 1) => (0, 0)
      case 'negative':
        changeScoreEvent({ positiveScore: 0, negativeScore: -1 })
        patchReviewEvent(resetReviewInfo)
        return

      // まだレビュー押してない場合 (0, 0) => (0, 1)
      case 'default':
        changeScoreEvent({ positiveScore: 0, negativeScore: 1 })
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
            {/* <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{data.profileDetail.score['positiveScore']}</span> */}
            <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{reviewScore.positiveScore}</span>
          </Col>
          <Col offset={3}>
            <FrownOutlined twoToneColor="#1890ff" style={{ color: '#1890ff', fontSize: 16 }} onClick={() => minusScore()} />
            <span style={{ marginLeft: 8, fontSize: 16, userSelect: 'none' }}>{reviewScore.negativeScore}</span>
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
  // 万屋のID
  planOwnerYorozuId: state.profile.profileDetail,
  // ログインユーザーのID
  loginUserYorozuId: state.account.yorozuId,
  // プランページのよろずやに、契約申請を送ったことがあるか確認する
  mySentContract: state.planContract.mySentPlanContractStatusAndPlanId,
  // reviewStatusは、loginuserが高評価,低評価、評価ていないの3パターンある
  reviewStatus: state.review.reviewStatus,
  // レビューの点数
  reviewScore: state.review.score,
})

// todo名前変更から 2020 7 3

const mapDispatchToProps = (dispatch) => ({
  changeScoreEvent: (num) => dispatch(changeReviewScore(num)),
  // reviewの送信または上書きをする
  patchReviewEvent: (reviewData) => dispatch(patchReviewEvent(reviewData)),
  // ログインユーザーがplanOwnerに送ったreviewの状況を確認
  // idはloginUsetとplanownerのYorozuIDのオブジェクト
  checkMysentReviewEvent: (yorozuIdInfo) => dispatch(checkMySentReview(yorozuIdInfo)),
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
