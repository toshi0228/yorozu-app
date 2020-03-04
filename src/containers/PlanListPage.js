import React from 'react';
import PlanList from '../components/planList/index';
import { Col, Row, Pagination } from 'antd';
import '../styles/PlanListPage.scss';

// import { Pagination } from 'antd';

const PlanListPage = () => {
  return (
    <>
      <Row type="flex" justify="center" style={{ marginBottom: 70 }}>
        <Col className="p" span={18}>
          <PlanList />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </>
  );
};

export default PlanListPage;
