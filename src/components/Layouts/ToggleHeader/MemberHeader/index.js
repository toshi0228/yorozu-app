import React, { useState } from 'react'
import { connect } from 'react-redux'

import { UnorderedListOutlined } from '@ant-design/icons'
import { Col, Row, MenuDrawer } from 'antd'
import styles from './index.module.scss'

import { signOut } from '../../../../store/actions/account'
import MyPageBtn from './MyPageBtn'

import HeaderLogo from '../HeaderLogo'
import SearchForm from '../../../form/searchForm'

// headerのcomponents
// import MenuDrawer from '../components/menuDrawer'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、ヘッダーの詳細ページ
// 24分割で,左空白3 ロゴ3、真ん中10,右サイド5 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const MemberHeader = (props) => {
  // ハンバーガーアイコンを押した時の、Drawerを表示、非表示のスイッチ
  const [isMenuDrawer, setIsMenuDrawer] = useState(false)

  // ハンバーガーを押した時に、Drawerを表示させる
  const showMenuDrawer = () => {
    setIsMenuDrawer(true)
  }

  return (
    <>
      <header>
        <Row className={styles.headerContainer} type="flex" justify="center" align="middle">
          {/* ロゴスペース */}
          <Col xs={21} md={3} className={styles.left}>
            <HeaderLogo />
          </Col>

          {/* PC用検索のスペース */}
          <Col xs={0} md={10} className={styles.center}>
            <Row type="flex" className={styles.box1} justify="start">
              <Col>
                <Row type="flex" className="menu" gutter={24}>
                  <Col>
                    <SearchForm />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {/* PC用 マイページボタン */}
          <Col xs={0} md={5} className={styles.right}>
            <Row type="flex" justify="end" gutter={24} span={8}>
              <Col>
                <MyPageBtn singOutEvent={props.singOutEvent} />
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
          {/* <MenuDrawer isDrawer={isMenuDrawer} setIsDrawer={setIsMenuDrawer} /> */}
        </Row>
      </header>
    </>
  )
}

const mapDispathcToProps = (dispatch) => ({
  singOutEvent: () => dispatch(signOut()),
})

export default connect(null, mapDispathcToProps)(MemberHeader)

// ============================================================================
// dispatchに関して 2020 5/11

// singOutEvent: () => dispatch(signOut()),

// アクションクリエーターをsignOut()を実行すると以下のオブジェクトが返ってくる
// このオブジェクトがdispatchによって、storeに渡される
// {type: SIGN_OUT,payload: { isLoggedIn: false }}

// export const signOut = () => {
//   return {
//     type: SIGN_OUT,
//     payload: { isLoggedIn: false },
//   }
// }

// ============================================================================
