import React from 'react'
import { Row, Col, Rate, Tag, Icon, Button } from 'antd'
import { SmileTwoTone, FrownOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

// import DetailPlanSection from '../../plan/detailPlanSection/index'
import ConsultationButton from '../../ConsultationButton'
import host from '../../../../constants/url'

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

  return (
    <>
      {/* よろず名前*/}
      <Row>
        <Col offset={3} span={21}>
          <h3 className={styles.name}>{data.profileDetail.yorozuyaName}</h3>
        </Col>
      </Row>
      {/* タグ */}
      <Row style={{ marginTop: 5 }}>
        <Col offset={3} span={20}>
          {tagList}
        </Col>
      </Row>

      {/* プロフィール画像 */}
      <Row type="flex" justify="center">
        <Col style={{ paddingTop: 40 }}>
          <img className={styles.circle} alt="画像" src={`${host.localhost()}${data.profileDetail.profileImage}`} />
        </Col>
      </Row>
      <Row type="flex" justify="center" style={{ marginTop: 25 }}>
        <Col>
          <div style={{ fontSize: 20 }}>{data.profileDetail.nickname}</div>
        </Col>
      </Row>

      {/* 評価 */}
      {/* <Row type="flex" justify="center" style={{ marginTop: 5 }}>
        <Col>
          <Rate disabled defaultValue={5} />
        </Col>
      </Row> */}

      {/* 相談ボタン */}
      <Row type="flex" justify="center" style={{ marginTop: 24 }}>
        <Col>
          <ConsultationButton />
        </Col>
      </Row>

      {/* 評価 */}
      <Row type="flex" justify="center" style={{ marginTop: 16 }}>
        <Col>
          <SmileTwoTone twoToneColor="#ff7d6e" style={{ fontSize: 16 }} />
          <span style={{ marginLeft: 8, fontSize: 16 }}>255</span>
        </Col>
        <Col offset={3}>
          <FrownOutlined twoToneColor="#1890ff" style={{ color: '#1890ff', fontSize: 16 }} />
          <span style={{ marginLeft: 8, fontSize: 16 }}>13</span>
        </Col>
      </Row>

      {/* プロフィールの説明 */}
      <Row type="flex" justify="center" style={{ marginTop: 40 }}>
        <Col span={18}>
          <div style={{ paddding: 20 }}>{data.profileDetail.profileDescription}</div>
        </Col>
      </Row>
    </>
  )
}

export default RightSide
