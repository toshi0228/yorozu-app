import React from 'react';
import { List, Card, Avatar } from 'antd';

const data = [
  {
    title: '何もしない屋'
  },
  {
    title: 'サプライズ屋'
  },
  {
    title: '電話屋'
  },
  {
    title: '宿屋'
  }
];

const Contracting = () => {
  return (
    <>
      <List
        dataSource={data}
        grid={{ gutter: [18, 18], column: 1, xs: 1, sm: 2, md: 1 }}
        style={{ marginTop: 40 }}
        renderItem={item => (
          <List.Item hoverable>
            <Card>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <span style={{ fontSize: 12 }}>2021年10月23日　　1200円</span>
                }
                description="ここから、slackを登録してくださいねああああああああああああああああああああ"
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Contracting;

{
  /* <List.Item.Meta
avatar={
  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
}
title={
  <span style={{ marginLeft: 40, fontSize: 12 }}>
    2021年10月23日
  </span>
}
description="ここから、slackを登録してくださいねああああああああああああああああああああ"
/> */
}
