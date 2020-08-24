import React, { useState } from 'react'
import { connect } from 'react-redux'

import { UnorderedListOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import styles from './index.module.scss'

import { signOut } from '../../../../store/actions/account'
import MyPageBtn from './MyPageBtn'

import HeaderLogo from '../HeaderLogo'
import SearchForm from '../../../form/searchForm'

// headerのcomponents
import MemberMenuDrawer from '../components/MemberMenuDrawer'

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
          <Col xs={20} md={3}>
            <HeaderLogo />
          </Col>

          {/* PC用検索のスペース */}
          <Col xs={0} md={10}>
            <Row type="flex" justify="start">
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
          <Col xs={0} md={5}>
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
              <UnorderedListOutlined style={{ fontSize: 24, marginLeft: 8 }} onClick={() => showMenuDrawer()} />
            </Col>
          </Row>
          {/* ハンバーガーボタンを押した時に、出てくるDrawer */}
          <MemberMenuDrawer isDrawer={isMenuDrawer} setIsDrawer={setIsMenuDrawer} />
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
