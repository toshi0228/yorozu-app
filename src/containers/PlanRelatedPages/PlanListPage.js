import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PlanList from '../../components/planRelated/planList/index';
import { Col, Row, Pagination } from 'antd';
import '../../styles/PlanListPage.scss';
import { fetchPlanList } from '../../store/actions/plan';

// import { Pagination } from 'antd';

// useEffect

const PlanListPage = (props) => {
  useEffect(() => {
    props.readPlanListEvents();
  }, []);

  return (
    <>
      <Row type="flex" justify="center" style={{ marginBottom: 70 }}>
        <Col span={18}>
          <PlanList planListdata={props.planList} />
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

const mapStateToprops = (state) => ({
  planList: state.plan,
});

const mapDispatchToProps = (dispatch) => ({
  readPlanListEvents: () => dispatch(fetchPlanList()),
});

export default connect(mapStateToprops, mapDispatchToProps)(PlanListPage);
