import React, {useEffect} from 'react'
import  {connect} from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import DashboardCarge from '../../components/dashboard/dashboardCharge'
import MessageSendTab from '../../components/message/messageSendTab'
import MessageTable from '../../components/message/messageTable'
import {feachMessageList} from '../../store/actions/message'

// ========================================================================
// メッセージを返信するボタンを押すと、メッセージを編集するボタンが出てくる
// ========================================================================

const MessagePage = (props) => {
  console.log(props)

  useEffect(()=>{
    props.readMessageEvents(props.authToken)
  },[])

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
          <Tabs type="card" onChange={callback} defaultActiveKey="1">
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
              {/* <DashboardSale /> */}
              <MessageTable />
            </Tabs.TabPane>

            {/* 編集タブの追加 */}
            <Tabs.TabPane tab="メッセージを送信" key="4">
              <MessageSendTab />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) =>({
  message: state.message,
  authToken: state.account.authToken.access
})

const mapDispatchToProps = (dispatch)=>({
  readMessageEvents:(authToken) => dispatch(feachMessageList(authToken))
})


export default connect(mapStateToProps,mapDispatchToProps)(MessagePage)
