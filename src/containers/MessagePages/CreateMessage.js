import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import MessageSendTab from '../../components/message/messageSendTab'
import MessageTable from '../../components/message/messageTable'
import { readRoomMessage } from '../../store/actions/message'
import routes from '../../routes/index'

// ========================================================================
// メッセージ作成ページ
// ========================================================================

const CreateMessage = (props) => {
  const senderYorozuId = props.params.match.params.id
  useEffect(() => {
    // 自分宛に送ってくれたメッセージをyorozuIDを使ってメッセージを呼び出す
    props.readRoomMessageEvents(senderYorozuId)
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
            {/* メッセージリストのタブ */}
            <Tabs.TabPane tab="メッセージ一覧" key="2">
              <MessageTable />
            </Tabs.TabPane>

            {/* メッセージ作成ページのタブ */}
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
  // ルームメッセージには、送信者と受信者のメッセージのやり取りしたメールのリストが入っている。
  roomMessage: state.message.roomMessage,
  authToken: state.account.authToken.access,
})

const mapDispatchToProps = (dispatch) => ({
  // 自分宛にメッセージを送ってくれた送信者のYorozuIdから、全てのメッセージを取得する
  readRoomMessageEvents: (senderYorozuId) => dispatch(readRoomMessage(senderYorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
