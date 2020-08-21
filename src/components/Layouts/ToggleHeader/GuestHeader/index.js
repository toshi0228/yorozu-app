import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

// import routes from '../../../../routes'
import SearchForm from '../../../form/searchForm'
import HeaderLogo from '../HeaderLogo'

// headerのcomponents
import MenuDrawer from '../components/menuDrawer'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、ヘッダーの詳細ページ
// 24分割で,左空白3 ロゴ3、真ん中10,右サイド5 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const GuestHeader = () => {
  // ハンバーガーアイコンを押した時の、Drawerを表示、非表示のスイッチ
  const [isMenuDrawer, setIsMenuDrawer] = useState(false)

  // ハンバーガーを押した時に、Drawerを表示させる
  const showMenuDrawer = () => {
    setIsMenuDrawer(true)
  }

  return (
    <>
      <header>
        <Row type="flex" justify="center" align="middle" className={styles.headerContainer}>
          {/* ロゴ */}
          <Col xs={20} md={3}>
            <HeaderLogo />
          </Col>

          {/* PC用検索 */}
          <Col xs={0} md={10} className={styles.searchArea}>
            <Row type="flex" justify="start">
              <Col>
                <SearchForm />
              </Col>
            </Row>
          </Col>

          {/* PC用ボタン */}
          {/* <Col className={styles.right} xs={4} md={5} className={styles.navbarArea}> */}
          <Col xs={0} md={5}>
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

          {/* スマホ用ボタン */}
          {/* スマホ画面の時に出てくるハンバーガーアイコン pcの時には、アイコンを表示させないようにする */}
          <Row xs={2}>
            <Col md={0}>
              <UnorderedListOutlined style={{ fontSize: 20, marginLeft: 10 }} onClick={() => showMenuDrawer()} />
            </Col>
          </Row>
          {/* ハンバーガーボタンを押した時に、出てくるDrawer */}
          <MenuDrawer isDrawer={isMenuDrawer} setIsDrawer={setIsMenuDrawer} />
        </Row>

        {/* モバイル用は、最初検索の欄が最初に表示される */}
        {/* <Row type="flex" justify="center" style={{ marginTop: 20, marginBottom: 20 }}> */}
        <Row type="flex" justify="center">
          <Col xs={22} md={0}>
            <SearchForm />
          </Col>
        </Row>

        {/* スマホ用の下線 */}
        <Row>
          <Col xs={24} md={0}>
            {/* <hr /> */}
            <div style={{ borderBottom: 'solid 1.2px #f4f4f4', marginTop: 10 }}></div>
          </Col>
        </Row>
      </header>
    </>
  )
}

export default GuestHeader

// =================================================================
// spanは、横100％を24とした時にどれくらを閉めるか
// ※スパンは、初期値の状態
// span={3} ロゴ
// span={10} 検索
// span={5} ボタン

// 小さい時 つまりxsの時 全体は24 他は、22閉める 両端に1ずつ空いてる
// xs={16} ロゴ
// xs={3} 検索
// xs={3} ボタン
// =================================================================
