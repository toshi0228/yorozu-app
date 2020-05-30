import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import MessageSendTab from '../../components/message/messageSendTab'
import MessageTable from '../../components/message/messageTable'
import { feachMessageList } from '../../store/actions/message'
import routes from '../../routes/index'

// ========================================================================
// メッセージを返信するボタンを押すと、メッセージを編集するボタンが出てくる
// ========================================================================

const CreateMessage = (props) => {
  useEffect(() => {
    // メッセージリストを呼んでくる
    props.readMessageEvents(props.authToken)
  }, [])

  function callback(key) {
    console.log(key)
    props.params.history.push(routes.messageList())
  }

  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="start">
        <Col offset={3} style={{ fontSize: 18 }}>
          メッセージ
        </Col>
      </Row>

      {/* タブ */}
      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={18}>
          <Tabs type="card" onChange={callback} defaultActiveKey="4">
            {/* 売り上げタブのコンテント */}
            <Tabs.TabPane tab="メッセージ一覧" key="2">
              <MessageTable data={props.message} />
            </Tabs.TabPane>

            {/* 編集タブの追加 */}
            <Tabs.TabPane tab="メッセージを作成" key="4">
              <MessageSendTab />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  message: state.message,
  authToken: state.account.authToken.access,
})

const mapDispatchToProps = (dispatch) => ({
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
