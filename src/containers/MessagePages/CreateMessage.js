import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import MessageSendTab from '../../components/message/messageSendTab'
import MessageTable from '../../components/message/messageTable'
import { readRoomMessage, feachMessageList, feachSendMessageList } from '../../store/actions/message'
import { feachPlanRequest } from '../../store/actions/request'
import routes from '../../routes/index'

// ========================================================================
// メッセージ作成ページ
// ========================================================================

const CreateMessage = (props) => {
  const roomUserYorozuId = props.params.match.params.id

  // メッセージリストから繊維して来た時、URLを変更する
  useEffect(() => {
    // 自分あてに送られたメッセージを取得する
    props.readMessageEvents(props.authToken)
    // 自分が送信したメッセージを取得する
    props.readSendMessageEvents(props.authToken)
    // 自分宛に送ってくれたメッセージをyorozuIDを使ってメッセージを呼び出す
    props.readRoomMessageEvents(roomUserYorozuId)
    // 自分宛に届いたプランリクエスト一覧を取得する
    props.readPlanRequestEvent(props.authToken)
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
  planRequest: state.planRequest,
})

const mapDispatchToProps = (dispatch) => ({
  // メッセージルームユーザーのYorozuIdから、メッセージを取得する
  // (自分が送信しメッセージとメッセージルームユーザーのメッセージが一緒になってくる)
  readRoomMessageEvents: (roomUserYorozuId) => dispatch(readRoomMessage(roomUserYorozuId)),
  // 自分あてに送られたメッセージを取得する
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
  // 自分が送信したメッセージを取得する
  readSendMessageEvents: (authToken) => dispatch(feachSendMessageList(authToken)),
  // 自分宛に届いたプランリクエスト一覧を取得する
  readPlanRequestEvent: (authToken) => dispatch(feachPlanRequest(authToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
