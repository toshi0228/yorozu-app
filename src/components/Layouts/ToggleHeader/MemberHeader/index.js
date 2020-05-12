import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import styles from './index.module.scss'
import routes from '../../../../routes'
// const { Header } = Layout;

const MemberHeader = () => {
  return (
    <>
      <header>
        <Row className={styles.headerContainer} type="flex" justify="center" align="middle">
          <Col span={3} className={styles.left}>
            <Link to="/">Yorozu</Link>
          </Col>

          <Col span={10} className={styles.center}>
            <Row type="flex" className={styles.box1}>
              <Col>
                <Row type="flex" className="menu" gutter={24}>
                  <Col>
                    <Link to="/plan">TimeLine</Link>
                  </Col>
                  <Col>
                    <Link to="/project">Dashboard</Link>
                  </Col>
                  <Col>
                    <Link to={routes.contracting()}>Subscribe</Link>
                  </Col>
                  <Col>
                    <Link to="/create_plan">Create</Link>
                  </Col>
                  <Col>
                    <Link to={routes.myPage()}>MyPage</Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={5} className={styles.right}>
            <Row type="flex" justify="end" gutter={24} span={8}>
              <Col>
                <Link to="/sign_in">
                  <div className={styles.btn}>ログアウト</div>
                </Link>
              </Col>
              <Col>
                <Link to="/sign_up">
                  <div className={styles.btn}>マイページ</div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  )
}

export default MemberHeader
