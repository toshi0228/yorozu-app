import React from 'react'
import { Col, Row } from 'antd'
// import { Link } from 'react-router-dom';
// import PlanRequestModal from '../planRequestModal'
import TogglePlanRequestBtn from '../TogglePlanRequestBtn'
import host from '../../../constants/url'

// ====================================================================
// 詳細ページのプランのセクション
// 24分割で, 左空白3、左サイド12,右サイド6 右空白3
// プランの部分は左の12の部分
// ====================================================================

const DetailPlanSection = ({ planData }) => {
  return (
    <>
      <img alt="example" src={`${host.localhost()}${planData.image}`} style={{ width: '100%', height: 360, borderRadius: 8 }} />
      {/* プランのタイトル */}
      <div style={{ marginBottom: 48 }}>
        {/* タイトル */}
        <Row style={{ marginTop: 40 }}>
          {/* <Col offset={2}> */}
          <Col>
            <h2>{planData.title}</h2>
          </Col>
        </Row>

        {/*料金 */}
        <Row>
          {/* <Col offset={2}> */}
          <Col>
            <h3>{planData.price}円</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr></hr>
          </Col>
        </Row>

        {/* プランの説明 */}
        {/* <Row type="flex" justify="center" style={{ paddingTop: 10 }}> */}
        <Row style={{ paddingTop: 20 }}>
          <Col span={24}>
            {/* {`詳細プランのコンポーネントですよ`} */}
            {planData.description}
          </Col>
        </Row>

        {/* プランリクエストボタン */}
        <Row gutter={[32, 32]} type="flex" style={{ marginTop: 20 }} justify="end">
          {/* <Col offset={2}> */}
          <Col style={{ marginBottom: 20 }}>
            {/* <PlanRequestModal /> */}
            <TogglePlanRequestBtn />
          </Col>

          {/* <Col style={{ marginBottom: 20 }}>
            <Button type="primary">契約する</Button>
          </Col> */}
        </Row>

        <Row>
          <Col>
            <hr></hr>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DetailPlanSection
