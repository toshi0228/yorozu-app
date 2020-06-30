import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

// import routes from '../../../../routes'
import SearchForm from '../../../form/searchForm'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、ヘッダーの詳細ページ
// 24分割で,左空白3 ロゴ3、真ん中10,右サイド5 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const GuestHeader = () => {
  return (
    <>
      <header>
        {/* ロゴ */}
        <Row className={styles.headerContainer} type="flex" justify="center" align="middle">
          <Col span={3} xs={16} md={3}>
            <Link to="/">
              <h2 className={styles.logoArea}>Yorozu</h2>
            </Link>
          </Col>

          {/* 検索 */}
          <Col span={10} xs={3} md={10} className={styles.searchArea}>
            <SearchOutlined className={styles.searchLogo} />
            <Row type="flex" justify="start">
              <Col>
                {/* モバイルの時は削除するブロック */}
                <div className={styles.searchForm}>
                  <Row type="flex" gutter={24}>
                    <Col>
                      <SearchForm />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>

          {/* ボタン */}
          <Col span={5} className={styles.right} xs={3} md={5} className={styles.navbarArea}>
            <UnorderedListOutlined className={styles.menu} />
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
