import React from 'react'
import { Row, Col, Tag, Skeleton } from 'antd'

import ConsultationButton from './ConsultationButton'

import ReviewButton from './ReviewButton'
import styles from './index.module.scss'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、profileの詳細ページ
// 引数 dataには、profileのオブジェクトが入っている
// 24分割で, 左空白3、左サイド12,右サイド6 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const RightSide = ({ data }) => {
  // タグリストを返す
  const tagList = data.profileDetail.tagList.map((tag, index) => {
    return <Tag key={index}>{`#${tag}`}</Tag>
  })

  // よろずやの名前 data.profileDetail.yorozuyaNameがundifindなら、初期値をリセットする
  const toggleYorozuyaName = () => {
    if (data.profileDetail.yorozuyaName) {
      return <h3 className={styles.name}>{data.profileDetail.yorozuyaName}</h3>
    } else {
      return <h3 className={styles.name}>○○○屋</h3>
    }
  }

  // プロフィール画像 props.registeredProfile.profileImageがundifinなら、初期値をセットする
  const toggleProfileImage = () => {
    if (data.profileDetail.profileImage) {
      // return <img style={{ height: 150, width: 150, borderRadius: '50%' }} src={data.profileDetail.profileImage} />
      return <img className={styles.profileImage} src={data.profileDetail.profileImage} />
    } else {
      return (
        <Skeleton
          active
          img
          style={{ height: 150, width: 150, borderRadius: '50%' }}
          src="https://st.depositphotos.com/1036039/2761/v/450/depositphotos_27612833-stock-illustration-user-icon.jpg"
        />
      )
    }
  }

  return (
    <>
      {/* よろず名前*/}
      <Row>
        <Col span={24}>{toggleYorozuyaName()}</Col>
      </Row>
      {/* タグ */}
      <Row style={{ marginTop: 5 }}>
        <Col span={24}>{tagList}</Col>
      </Row>

      {/* プロフィール画像 */}
      <Row type="flex" justify="center">
        <Col style={{ paddingTop: 40 }}>{toggleProfileImage()}</Col>
      </Row>

      {/* ニックネーム */}
      <Row type="flex" justify="center" style={{ marginTop: 24 }}>
        <Col>
          <div className={styles.nickname}>{data.profileDetail.nickname}</div>
        </Col>
      </Row>

      {/* 相談ボタン */}
      <Row type="flex" justify="center" style={{ marginTop: 24 }}>
        <Col>
          <ConsultationButton />
        </Col>
      </Row>

      {/* 評価 */}
      <Row type="flex" justify="center" style={{ marginTop: 16 }}>
        <ReviewButton data={data} />
      </Row>

      {/* プロフィールの説明 */}
      <Row type="flex" justify="center" style={{ marginTop: 40 }}>
        <Col span={24}>
          <div style={{ paddding: 20 }}>{data.profileDetail.profileDescription}</div>
        </Col>
      </Row>
    </>
  )
}

export default RightSide
