import React from 'react';
import { Row, Col, Button, Rate, Tag, Icon } from 'antd';
import styles from './index.module.scss';
import DetailPlanSection from '../../planRelated/detailPlanSection/index';

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、profileの詳細ページ
// 引数 dataには、profileのオブジェクトが入っている
// 24分割で, 左空白3、左サイド12,右サイド6 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const DetailProfile = ({ data }) => {
  // プランリストを返す
  const planList = data.profileDetail.planList.map((planData, index) => {
    return <DetailPlanSection key={index} planData={planData} />;
  });

  // タグリストを返す
  const tagList = data.profileDetail.tagList.map((tag, index) => {
    return <Tag>{`#${tag}`}</Tag>;
  });

  return (
    <>
      <Row>
        <Col offset={3}>
          <h2>詳細ページ</h2>
        </Col>
      </Row>

      {/*24分割で, 左空白3、左サイド12,右サイド6 右空白3*/}
      {/* 左サイドバー */}
      <Row type="flex" justify="center" style={{ paddingTop: 30 }}>
        {/* プラン一覧 */}
        <Col span={12} md={12}>
          {planList}
        </Col>

        {/* 右サイドバー */}
        <Col span={6}>
          {/* よろず名前*/}
          <Row>
            <Col offset={3} span={20}>
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
              <img
                className={styles.circle}
                alt="画像"
                src={data.profileDetail.profileImage}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: 25 }}>
            <Col>
              <div style={{ fontSize: 20 }}>{data.profileDetail.nickname}</div>
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
                {data.profileDetail.profileDescription}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DetailProfile;
