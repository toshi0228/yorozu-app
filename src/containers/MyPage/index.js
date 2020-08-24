import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import CreateProfilePage from './CreateProfilePage'
import CreatePlanPage from './CreatePlanPage'
import PreviewYorozuPage from './PreviewYorozuPage'

import { readProfileItem } from '../../store/actions/profile'

const ManagementTopPage = (props) => {
  // createProfileで初期値を表示させるために、profileで登録した項目を読み込む
  // もうすでにprofile情報がある場合に、登録項目にデータを表示させるようにしておく
  useEffect(() => {
    props.readprofileItemEvent(props.profile)
  }, [props.profile])

  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="start">
        {/* pc用 */}
        <Col xs={0} md={24} offset={3} style={{ fontSize: 18 }}>
          <h2>{props.yorozuyaName}</h2>
        </Col>
        <Col xs={24} md={0} offset={1} style={{ marginTop: 24 }}>
          <h4>ダッシュボード</h4>
        </Col>
      </Row>

      {/* PC用 */}
      <Row type="flex" justify="center">
        {/* スマホ画面の時は、画面いっぱいまで使うため24 */}
        <Col xs={0} md={18} style={{ marginTop: 24 }}>
          {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="よろず屋プレビュー" key="1">
              <PreviewYorozuPage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="プロフィール作成" key="2">
              <CreateProfilePage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="プラン作成" key="3">
              <CreatePlanPage />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>

      {/* スマホ用 */}
      <Row type="flex" justify="center">
        {/* スマホ画面の時は、画面いっぱいまで使うため24 */}
        <Col xs={24} md={0} style={{ marginTop: 8 }}>
          {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
          <Tabs defaultActiveKey="1" size="small">
            <Tabs.TabPane tab="プレビュー" key="1">
              <PreviewYorozuPage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="プロフィール" key="2">
              <CreateProfilePage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="プラン" key="3">
              <CreatePlanPage />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  authToken: state.account.authToken.access,
  accountId: state.profile.accountId,
  yorozuyaName: state.profile.profileDetail.yorozuyaName,
  profile: state.profile.profileDetail,
})

const mapDispatchToProps = (dispatch) => ({
  readprofileItemEvent: (profileData) => dispatch(readProfileItem(profileData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagementTopPage)
