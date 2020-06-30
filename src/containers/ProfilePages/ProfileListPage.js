import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProfileList from '../../components/profile/ProfileList/index'
import { Col, Row, Pagination } from 'antd'
import { fetchProfileList, profileDetailInitialize } from '../../store/actions/profile'

import styles from '../../styles/ProfileListPage.module.scss'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// YOROZUのトップページ
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const ProfileListPage = (props) => {
  useEffect(() => {
    props.readProfileListEvents()
    // プランページに移動した時に、前のプランプロフィールデータやプランデータが残っている可能性があるので初期化
    props.profileDetailInitializeEvent()
  }, [])

  return (
    <>
      {/* モバイル用 */}
      <div className={styles.mobileProfileList}>
        <Row type="flex" justify="center">
          <Col span={24}>
            <ProfileList data={props.data} />
          </Col>
        </Row>
      </div>

      {/* デスクトップ用 */}
      <div className={styles.pcProfileList}>
        <Row type="flex" justify="center" className={styles.profileList}>
          <Col span={18}>
            <ProfileList data={props.data} />
          </Col>
        </Row>
      </div>

      {/* ページの項目 */}
      <Row type="flex" justify="center">
        <Col>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </>
  )
}

const mapStateToprops = (state) => ({
  data: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
  readProfileListEvents: () => dispatch(fetchProfileList()),
  // プランページに移動した時に、前のプランプロフィールデータやプランデータが残っている可能性があるので
  // プランリストページに移動したら初期化する
  profileDetailInitializeEvent: () => dispatch(profileDetailInitialize()),
})

export default connect(mapStateToprops, mapDispatchToProps)(ProfileListPage)
