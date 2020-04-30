import React from 'react';
import { Row, Col, Button, Rate, Tag, Icon } from 'antd';
import styles from './index.module.scss';
import data from '../../../Data/dummyData.json';
import DetailPlanSection from '../detailPlanSection/index';

const DetailPlan = ({ profileData }) => {
  // プランが読み込まれたら、配列のプランデータを読み込み
  const PlanList = profileData.planList.map((planData, index) => {
    return <DetailPlanSection key={index} planData={planData} />;
  });

  // const PlanList = () => {
  //   if (profileData.isLoading) {
  //     profileData.planList.map((planData) => {
  //       return <DetailPlanSection planData={planData} />;
  //     });
  //   } else {
  //     return <DetailPlanSection />;
  //   }
  // };
  return (
    <>
      <Row>
        <Col offset={3}>
          <h2>詳細ページ</h2>
        </Col>
      </Row>

      {/* 左サイドバー */}
      <Row type="flex" justify="center" style={{ paddingTop: 30 }}>
        {/* プラン一覧 */}
        <Col span={12} md={12}>
          {PlanList}
          {/* <PlanList /> */}
          {/*プランセクションの切り出し */}
          {/* <DetailPlanSection
            planList={profileData.planList}
            isLoading={profileData.isLoading}
          /> */}
          {/* <DetailPlanSection /> */}
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
                src={profileData.profileImage}
              />
            </Col>
          </Row>

          <Row type="flex" justify="center" style={{ marginTop: 25 }}>
            <Col>
              <div style={{ fontSize: 20 }}>{profileData.yorozuyaName}</div>
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
              <div style={{ paddding: 20 }}>
                {profileData.profileDescription}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DetailPlan;
