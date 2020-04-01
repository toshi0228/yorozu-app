import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Rate, Tag, Icon } from 'antd';
import styles from './index.module.scss';
import data from '../../../Data/dummyData.json';

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
        {/* メインの画像 */}
        <Col span={12} md={12}>
          <img
            alt="example"
            src={data.iamge}
            style={{ width: '100%', height: 360, borderRadius: 8 }}
          />

          {/* プランのタイトル */}
          <div>
            {/* タイトル */}
            <Row style={{ marginTop: 40 }}>
              {/* <Col offset={2}> */}
              <Col>
                <h2>{data.planTitle}</h2>
              </Col>
            </Row>

            {/*料金 */}
            <Row>
              {/* <Col offset={2}> */}
              <Col>
                <h3>{data.planPrice}円</h3>
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
                {`詳細プラン${id}のコンポーネントですよ`}
                {data.planDescription}
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
        </Col>

        {/* 右サイドバー */}

        <Col span={6}>
          {/* タグ */}
          <Row>
            <Col offset={3} span={20}>
              <Tag>旅館オーナー</Tag>
              <Tag>インスタグラマー</Tag>
              <Tag>サプライズ</Tag>
              <Tag>カメラマン</Tag>
              <Tag>エンジニエア</Tag>
            </Col>
          </Row>

          {/* プロフィール画像 */}
          <Row type="flex" justify="center">
            <Col style={{ paddingTop: 40 }}>
              <img
                className={styles.circle}
                alt="example"
                src={data.profileImage}
              />
            </Col>
          </Row>

          <Row type="flex" justify="center" style={{ marginTop: 25 }}>
            <Col>
              <div style={{ fontSize: 20 }}>長野峡泉</div>
            </Col>
          </Row>

          {/* 評価 */}
          <Row type="flex" justify="center" style={{ marginTop: 5 }}>
            <Col>
              <Rate disabled defaultValue={5} />
            </Col>
          </Row>

          <Icon type="icon-facebook" />

          {/* プロフィールの説明 */}
          <Row type="flex" justify="center" style={{ marginTop: 40 }}>
            <Col span={18}>
              <div style={{ paddding: 20 }}>{data.profileDescription}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default connect()(DetailPlan);
