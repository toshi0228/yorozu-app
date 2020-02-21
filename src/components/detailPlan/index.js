import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './index.scss';

const DetailPlan = ({ id, history }) => {
  console.log(history);
  const Consultation = () => {
    alert('相談します');
  };
  return (
    <Row>
      <Col span={12} md={6}>
        <div className="detail-plan-card">
          <div>タグ</div>
          <div>{`詳細プラン${id}のコンポーネントですよ`}</div>
          <div>プロフィール</div>
          <div>プランタイトル</div>
          <div>値段</div>
          <div>契約ボタン</div>
          <Link to="/message/">
            <div onClick={Consultation}>相談ボタン</div>
          </Link>
        </div>
      </Col>
      <Col span={12}>qqqq</Col>
    </Row>
  );
};

export default DetailPlan;
