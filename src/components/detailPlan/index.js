import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import data from '../../Data/dummyData.json';

const DetailPlan = ({ id, history }) => {
  console.log(history);
  console.log(data);
  const Consultation = () => {
    alert('相談します');
  };

  return (
    <>
      <Row>
        <Col offset={3}>
          <h2>詳細ページ</h2>
        </Col>
      </Row>
      {/* 左サイドバー */}
      <Row type="flex" justify="center" style={{ paddingTop: 30 }}>
        <Col span={12} md={12} style={{ background: 'green' }}>
          <img
            alt="example"
            src={data.iamge}
            style={{ width: '100%', height: 360 }}
          />

          <div className={styles.detailPlanCard}>
            <h2 style={{ textAlign: 'center', marginTop: 40 }}>
              {data.planTitle}
            </h2>

            <div>{`詳細プラン${id}のコンポーネントですよ`}</div>
            <div>プロフィール</div>
            <div>値段</div>
            <div>契約ボタン</div>
            <Link to="/message/">
              <div onClick={Consultation}>相談ボタン</div>
            </Link>
          </div>
        </Col>

        {/* 右サイドバー */}
        <Col span={6}>
          <div
            style={{ background: 'yellow ', textAlign: 'center', fontSize: 20 }}
          >
            長野峡泉
          </div>
          <Row type="flex" justify="center">
            <Col style={{ paddingTop: 40 }}>
              <img
                className={styles.circle}
                alt="example"
                src={data.profileImage}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: 40 }}>
            <Col span={18}>
              <div style={{ paddding: 20 }}>{data.profileDescription}</div>
            </Col>
          </Row>
          <div>タグ</div>
        </Col>
      </Row>
    </>
  );
};

export default connect()(DetailPlan);
