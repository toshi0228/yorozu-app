import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';

// ============================================================
// プランリストのカード部分
// ============================================================

const ProfileCard = ({ planData }) => {
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
          <Card.Meta
            title={planData.yorozuyaName}
            description={planData.profileDescription}
            style={{ height: 100 }}
          />
        </Card>
      </Link>
    </>
  );
};

export default ProfileCard;

// リンクを作るとエラーになる
// <Link to="/"> */}
// <Icon type="twitter" />
// </Link>
