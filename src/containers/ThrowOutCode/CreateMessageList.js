import React from 'react'
import { Row, Col, Tabs } from 'antd'
import DashboardSale from '../../components/dashboardRelated/dashboardSale/index'
import DashboardCarge from '../../components/dashboardRelated/dashboardCharge'
import MessageSend from '../../components/messageSend'
import MessageTable from '../../components/MessageTable'

// ========================
// 2020 5 12作成中
// ========================

const CreateMessageList = () => {
  function callback(key) {
    console.log(key)
  }
  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="start">
        <Col offset={3} style={{ fontSize: 18 }}>
          メッセージリスト
        </Col>
      </Row>

      {/* タブ */}
      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={18}>
          <Tabs type="card" onChange={callback}>
            {/* 売り上げタブのコンテント */}
            <Tabs.TabPane tab="万屋から" key="1">
              <MessageTable />
            </Tabs.TabPane>

            {/* 課金タブのコンテント */}
            <Tabs.TabPane tab="顧客から" key="2">
              <DashboardCarge></DashboardCarge>
            </Tabs.TabPane>

            {/* 仕事の依頼コンテント */}
            <Tabs.TabPane tab="お仕事依頼" key="3">
              <DashboardSale />
              <MessageSend />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default CreateMessageList
