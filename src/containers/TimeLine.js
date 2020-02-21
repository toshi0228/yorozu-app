import React from 'react';
import { Row, Col } from 'antd';

// import { Row, Col, Card } from 'antd';

import '../styles/TimeLine.scss';

const TimeLine = () => {
  return (
    <div className="box-wrap">
      <Row type="flex" justify="space-between">
        <Col span={4} className="cal1">
          <div className="box box1">box1</div>
        </Col>
        <Col span={4} className="cal2">
          <div className="box box2">box2</div>
        </Col>
        <Col span={4} className="cal3">
          <div className="box box3">box3</div>
        </Col>
      </Row>
    </div>
  );
};

export default TimeLine;
