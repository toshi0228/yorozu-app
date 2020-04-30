import React from 'react';
import { Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import data from '../../../Data/dummyData.json';

// ====================================================================
// 詳細ページのプランのセクション
// ====================================================================

const DetailPlanSection = ({ planData }) => {
  console.log(planData);
  const Consultation = () => {
    alert('相談します');
  };
  return (
    <>
      <img
        alt="example"
        src={planData.image}
        style={{ width: '100%', height: 360, borderRadius: 8 }}
      />
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
          <Col span={20}>
            {/* {`詳細プランのコンポーネントですよ`} */}
            {planData.description}
          </Col>
        </Row>

        {/* 相談ボタン */}
        <Row gutter={[32, 32]} type="flex" style={{ marginTop: 20 }}>
          {/* <Col offset={2}> */}
          <Col>
            <Link to="/message/">
              <Button type="primary" onClick={Consultation}>
                相談する
              </Button>
            </Link>
          </Col>

          <Col style={{ marginBottom: 20 }}>
            <Button type="primary">契約する</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr></hr>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DetailPlanSection;
