import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProfileList from '../../components/profileRelated/ProfileList/index';
import { Col, Row, Pagination } from 'antd';
import '../../styles/PlanListPage.scss';
import { fetchProfileList, tokenVerify } from '../../store/actions/profile';

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// YOROZUのトップページ
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const ProfileListPage = (props) => {
  console.log(props);
  useEffect(() => {
    // トークンがあれば、menbereページに遷移させる
    props.memberPageTransitionEvent(props.token);
    props.readProfileListEvents();
  }, []);

  return (
    <>
      <Row type='flex' justify='center' style={{ marginBottom: 70 }}>
        <Col span={18}>
          <ProfileList data={props.data} />
        </Col>
      </Row>

      {/* ページの項目 */}
      <Row type='flex' justify='center'>
        <Col>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </>
  );
};

const mapStateToprops = (state) => ({
  data: state.profile,
  token: state.account.authToken,
});

const mapDispatchToProps = (dispatch) => ({
  memberPageTransitionEvent: (token) => dispatch(tokenVerify(token)),
  readProfileListEvents: () => dispatch(fetchProfileList()),
});

export default connect(mapStateToprops, mapDispatchToProps)(ProfileListPage);
