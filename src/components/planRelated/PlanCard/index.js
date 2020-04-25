import React from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

// import { Link } from 'react-router-dom';

const PlanCard = ({ item }) => {
  const { Meta } = Card;
  return (
    <>
      <Link to={`/plan/detail/${item.id}`}>
        <Card
          cover={<img alt="example" src={item.image} style={{ height: 200 }} />}
          hoverable
          actions={[
            <Icon type="twitter" />,
            <Icon type="instagram" />,
            <Icon type="facebook" />,
          ]}
        >
          <Meta title={item.title} description={item.description} />
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
