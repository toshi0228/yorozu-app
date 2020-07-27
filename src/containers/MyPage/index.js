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
        <Col offset={3} style={{ fontSize: 18 }}>
          <h2>{props.yorozuyaName}</h2>
        </Col>
      </Row>

      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={18}>
          {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="よろず屋プレビュー" key="3">
              <PreviewYorozuPage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="プロフィール作成" key="2">
              <CreateProfilePage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="プラン作成" key="1">
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
