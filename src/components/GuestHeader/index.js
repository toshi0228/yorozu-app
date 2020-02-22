import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import styles from './index.module.scss';
// const { Header } = Layout;

const GuestHeader = () => {
  return (
    <>
      <header>
        <Row
          className={styles.headerContainer}
          type="flex"
          justify="space-between"
          align="middle"
        >
          <Row type="flex" justify="start" gutter={48}>
            <Col>
              <Link to="/">ゲストヘッダー</Link>
            </Col>

            <Col>
              <Row type="flex" className="menu" gutter={24}>
                <Col>
                  <Link to="/plan">Home</Link>
                </Col>
                <Col>
                  <Link to="/project">About</Link>
                </Col>
                <Col>
                  <Link to="/time_line">Topic</Link>
                </Col>
                <Col>
                  <Link to="/create_plan">Create</Link>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row type="flex" justify="end" gutter={24}>
            <Col>
              <Link to="/">ログイン</Link>
            </Col>
            <Col>
              <Link to="/">新規登録</Link>
            </Col>
          </Row>
        </Row>
      </header>
      <hr />
    </>
  );
};

export default GuestHeader;
