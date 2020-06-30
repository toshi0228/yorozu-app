import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Col } from 'antd'
import { SmileTwoTone, FrownOutlined } from '@ant-design/icons'

import { plusReview, minusReview } from '../../../../../store/actions/profile'
import styles from './index.module.scss'

const ReviewButton = ({ data, plusReviewEvent, minusReviewEvent }) => {
  const [isClickPlusReview, setIsClickPlusReview] = useState(false)
  const [isClickMinusReview, setIsClickMinusReview] = useState(false)

  // プラスレビューをすでにクリックしたことがあるなら、プラスにしていた分をマイナスにする
  const plusScore = () => {
    if (isClickPlusReview) {
      plusReviewEvent(-1)
      setIsClickPlusReview(false)
    } else {
      plusReviewEvent(1)
      setIsClickPlusReview(true)
    }
  }

  // マイナスレビューをクリックしたことがあるなら、マイナスしていた分を、プラスに戻す
  const minusScore = () => {
    if (isClickMinusReview) {
      minusReviewEvent(-1)
      setIsClickMinusReview(false)
    } else {
      minusReviewEvent(1)
      setIsClickMinusReview(true)
    }
  }

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
}

const mapDispatchToProps = (dispatch) => ({
  plusReviewEvent: (num) => dispatch(plusReview(num)),
  minusReviewEvent: (num) => dispatch(minusReview(num)),
})

export default connect(null, mapDispatchToProps)(ReviewButton)
