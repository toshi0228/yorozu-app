import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

// import routes from '../../../../routes'
import SearchForm from '../../../form/searchForm'
import HeaderLogo from '../HeaderLogo'

// headerのcomponents
import MenuDrawer from '../components/menuDrawer'
import SearchDrawer from '../components/searchDrawer'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、ヘッダーの詳細ページ
// 24分割で,左空白3 ロゴ3、真ん中10,右サイド5 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const GuestHeader = () => {
  // ハンバーガーアイコンを押した時の、Drawerを表示、非表示のスイッチ
  const [isMenuDrawer, setIsMenuDrawer] = useState(false)

  // 検索画面を押した時の、Drawerを表示,非表示のスイッチ
  // const [isSearchDrawer, setIsSearchDrawer] = useState(false)

  // ハンバーガーを押した時に、Drawerを表示させる
  const showMenuDrawer = () => {
    setIsMenuDrawer(true)
  }

  // 検索のアイコンを押した時に、検索フォームを表示させる
  // const showSearchForm = () => {
  //   setIsSearchDrawer(true)
  // }
  return (
    <>
      <header>
        {/* ロゴ */}
        <Row
          className={styles.headerContainer}
          type="flex"
          justify="center"
          align="middle"
          style={{ borderBottom: 'solid 0.4px  #B3B3B3' }}
        >
          <Col span={3} xs={18} md={3}>
            <HeaderLogo />
          </Col>

          {/* 検索 */}
          {/* <Col span={10} xs={0} md={10} className={styles.searchArea}>
            スマホ画面の時に出てくる検索アイコン
            <SearchOutlined className={styles.searchLogo} onClick={() => showSearchForm()} />

            検索ボタンを押した時に表示されるDrawer
            <SearchDrawer isDrawer={isSearchDrawer} setIsDrawer={setIsSearchDrawer} />
            <Row type="flex" justify="start">
              <Col>
                モバイルの時は削除するブロック
                <div className={styles.searchForm}>
                  <Row type="flex" gutter={24}>
                    <Col>
                      <SearchForm />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col> */}

          {/* 検索 */}
          <Col span={10} xs={0} md={10} className={styles.searchArea}>
            <Row type="flex" justify="start">
              <Col>
                <SearchForm />
              </Col>
            </Row>
          </Col>

          {/* ボタン */}
          <Col span={5} className={styles.right} xs={4} md={5} className={styles.navbarArea}>
            {/* スマホ画面の時に出てくるハンバーガーアイコン */}
            <UnorderedListOutlined className={styles.menu} onClick={() => showMenuDrawer()} />

            {/* ハンバーガーボタンを押した時に、出てくるDrawer */}
            <MenuDrawer isDrawer={isMenuDrawer} setIsDrawer={setIsMenuDrawer} />

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
