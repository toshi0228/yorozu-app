import React from 'react'
import { connect } from 'react-redux'

import { Col, Row } from 'antd'
import styles from './index.module.scss'

import { signOut } from '../../../../store/actions/account'
import MyPageBtn from './MyPageBtn'

import HeaderLogo from '../HeaderLogo'
import SearchForm from '../../../form/searchForm'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、ヘッダーの詳細ページ
// 24分割で,左空白3 ロゴ3、真ん中10,右サイド5 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const MemberHeader = (props) => {
  return (
    <>
      <header>
        <Row className={styles.headerContainer} type="flex" justify="center" align="middle">
          {/* ロゴスペース */}
          <Col span={3} className={styles.left}>
            <HeaderLogo />
          </Col>

          {/* 検索のスペース */}
          <Col span={10} className={styles.center}>
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

          {/* マイページボタン */}
          <Col span={5} className={styles.right}>
            <Row type="flex" justify="end" gutter={24} span={8}>
              <Col>
                <MyPageBtn singOutEvent={props.singOutEvent} />
              </Col>
            </Row>
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
