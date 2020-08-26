import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'

import MessageSendTab from '../../components/message/messageSendTab/pc'
import MessageTable from '../../components/message/messageTable/pc'

import { readRoomMessage, feachMessageList, feachSendMessageList, readMessageRoomUserYorozuId } from '../../store/actions/message'
import { feachPurchasersList } from '../../store/actions/planContract'

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
    props.readPurchasersEvent(props.authToken)
  }, [])

  // /message/rooms/●●●/のパスに来た時に、この●●●のyorozuIdを取得する
  // MessageSendTabでリロードした時に,yorozuIdを取得できないでエラーになるので最初に取得する
  // messageSendTabのleftSideでyorozuIdを取得することができる
  useEffect(() => {
    props.readMessageRoomUserYorozuIdEvent(roomUserYorozuId)
  }, [])

  function callback(key) {
    console.log(key)
    props.params.history.push(routes.messageList())
  }

  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="start">
        <Col offset={3} style={{ fontSize: 18, marginTop: 48 }}>
          メッセージ
        </Col>
      </Row>

      {/* タブ */}
      <Row type="flex" justify="center" style={{ marginTop: 20, minHeight: 700 }}>
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
  // メッセールームユーザーのyorozuId(試し)
  roomUserYorozuId: state.message.roomUserYorozuId,
})

const mapDispatchToProps = (dispatch) => ({
  // メッセージルームユーザーのYorozuIdから、メッセージを取得する
  // (自分が送信しメッセージとメッセージルームユーザーのメッセージが一緒になってくる)
  readRoomMessageEvents: (roomUserYorozuId) => dispatch(readRoomMessage(roomUserYorozuId)),
  // 自分あてに送られたメッセージを取得する
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
  // 自分が送信したメッセージを取得する
  readSendMessageEvents: (authToken) => dispatch(feachSendMessageList(authToken)),
  // 自分宛に届いプランリクエストの一覧を取得する
  readPurchasersEvent: (authToken) => dispatch(feachPurchasersList(authToken)),
  // /message/rooms/●●●/のパスに来た時に、この●●●のyorozuIdを取得する(必要ないかしれない)
  readMessageRoomUserYorozuIdEvent: (yorozuId) => dispatch(readMessageRoomUserYorozuId(yorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
