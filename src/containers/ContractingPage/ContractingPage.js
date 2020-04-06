import React from 'react';
import { Row, Col } from 'antd';
import Contracting from '../../components/contracting';

const ContractingPage = () => {
  return (
    <>
      <Row type="flex" justify="center">
        <Col style={{ fontSize: 18 }}>契約の履歴</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={18}>
          <Contracting />
        </Col>
      </Row>
    </>
  );
};

export default ContractingPage;
