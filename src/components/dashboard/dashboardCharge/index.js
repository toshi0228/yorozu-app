import React from 'react';
import { Row, Col, Table } from 'antd';

// const columns

const DashboardSales = () => {
  const columns = [
    { title: '日にち', dataIndex: 'day' },
    { title: 'ユーザー', dataIndex: 'user' },
    { title: 'プラン名', dataIndex: 'planTitle' },
    { title: '金額', dataIndex: 'planPrice' }
  ];

  const data = [
    {
      day: '2021年10月24',
      user: 'ああああああああ',
      planTitle: 'ななななああああああああああああああああああああああ',
      planPrice: '2000円'
    },
    {
      day: '2021年10月24',
      user: 'ああああああああ',
      planTitle: 'ななななああああああああああああああああああああああ',
      planPrice: '11000円'
    }
  ];
  return (
    <>
      <div>今月のお支払い</div>
      <Row type="flex" justify="end">
        <Col>
          <p>{`総額:15000円`}</p>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data}></Table>
    </>
  );
};

export default DashboardSales;
