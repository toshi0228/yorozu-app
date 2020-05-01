import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Rate, Tag, Icon } from 'antd';
import styles from './index.module.scss';
import DetailPlanSection from '../../planRelated/detailPlanSection/index';

const DetailProfile = ({ profileData }) => {
  console.log(profileData.tagList);
  const [planList, setPlanList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const renderPlanList = () => {
    // プランリストを返す
    const planList = profileData.planList.map((planData, index) => {
      return <DetailPlanSection key={index} planData={planData} />;
    });
    setPlanList(planList);

    // タグリストを返す
    const tagList = profileData.tagList.map((tag) => {
      return <Tag>{tag}</Tag>;
    });
    setTagList(tagList);
  };

  // 初回のrenderでprofileDataに値が入っていなくて、エラーが起きるので、if文の処理を仕込む
  // 初回はfalseなのでtrueの処理はされない
  useEffect(() => {
    if (profileData[0][0].isLoading) {
      renderPlanList();
    }
  }, [profileData]);

  // const PlanList = profileData.planList.map((palnData, index) => {
  //   return console.log(palnData);
  // });

  // const tags = [];

  // // プランが読み込まれたら、配列のプランデータを読み込み
  // const PlanList = profileData.planList.map((planData, index) => {
  //   // if (index === 0) {
  //   //   tags.push(planData.tags[0].name);
  //   // }
  //   // tags.forEach((tag) => {
  //   //   if (tag === planData.tags[0].name) {
  //   //     console.log('同じのがあった');
  //   //   } else {
  //   //     console.log('同じものではない');
  //   //     tags.push(planData.tags[0].name);
  //   //   }
  //   // });
  //   // console.log(tags);
  //   return <DetailPlanSection key={index} planData={planData} />;
  // });

  // const tagList = tags.map((tag) => {
  //   return console.log(tag);
  // });

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
          {planList}
          {/* {renderPlanList} */}
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
              {tagList}
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

export default DetailProfile;
