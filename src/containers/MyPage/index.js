import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import CreateProfilePage from './CreateProfilePage'
import CreatePlanPage from './CreatePlanPage'
import PreviewYorozuPage from './PreviewYorozuPage'

const ManagementTopPage = (props) => {
  console.log('ManagementTopPage')
  console.log(props)
  function callback(key) {
    console.log(key)
  }
  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="start">
        <Col offset={3} style={{ fontSize: 18 }}>
          <h2>なんでもや</h2>
        </Col>
      </Row>

      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={18}>
          <Tabs defaultActiveKey="1" onChange={callback}>
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
    </>
  )
}

const mapStateToProps = (state) => ({
  authToken: state.account.authToken.access,
  accountId: state.profile.accountId,
})

export default connect(mapStateToProps, null)(ManagementTopPage)
