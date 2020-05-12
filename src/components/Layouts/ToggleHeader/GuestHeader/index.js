import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import styles from './index.module.scss'
import { Input } from 'antd'
// import routes from '../../../../routes'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、ヘッダーの詳細ページ
// 24分割で,左空白3 ロゴ3、真ん中10,右サイド5 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const GuestHeader = () => {
  return (
    <>
      <header>
        <Row className={styles.headerContainer} type="flex" justify="center" align="middle">
          <Col span={3} className={styles.left}>
            <Link to="/">
              <h2>Yorozu</h2>
            </Link>
          </Col>

          <Col span={10} className={styles.center}>
            <Row type="flex" className={styles.box1} justify="start">
              <Col>
                <Row type="flex" className="menu" gutter={24}>
                  <Col>
                    <Input.Search placeholder="検索" style={{ width: 480 }}></Input.Search>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={5} className={styles.right}>
            <Row type="flex" justify="end" gutter={24} span={8}>
              <Col>
                <Link to="/sign_in">
                  <div className={styles.btn}>ログイン</div>
                </Link>
              </Col>
              <Col>
                <Link to="/sign_up">
                  <div className={styles.btn}>新規登録</div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  )
}

export default GuestHeader
