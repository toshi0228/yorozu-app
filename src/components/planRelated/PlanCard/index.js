import React from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

// ============================================================
// プランリストのカード部分
// ============================================================

const PlanCard = ({ planData }) => {
  const { Meta } = Card;
  return (
    <>
      <Link to={`/plan/detail/${planData.id}`}>
        <Card
          cover={
            <img
              alt="example"
              src={planData.yorozuMainImage}
              style={{ height: 200 }}
            />
          }
          hoverable
          actions={[
            <Icon type="twitter" />,
            <Icon type="instagram" />,
            <Icon type="facebook" />,
          ]}
        >
          <Meta
            title={planData.yorozuyaName}
            description={planData.profileDescription}
          />
        </Card>
      </Link>
    </>
  );
};

export default PlanCard;

// リンクを作るとエラーになる
// <Link to="/"> */}
// <Icon type="twitter" />
// </Link>
