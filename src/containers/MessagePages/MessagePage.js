import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'

// components
// pc用 components
import MessageSendTab from '../../components/message/messageSendTab/pc'
import MessageTable from '../../components/message/messageTable/pc/index'

// mobile用 Components
import MobileMessageTable from '../../components/message/messageTable/mobile/index'
import MobileMessageSendTab from '../../components/message/messageSendTab/mobile'

// action
import { feachMessageList, feachSendMessageList, readTopPageMessage } from '../../store/actions/message'
import { feachPurchasersList } from '../../store/actions/planContract'

// ========================================================================
// メッセージを返信するボタンを押すと、メッセージを編集するボタンが出てくる
// ========================================================================

const MessagePage = (props) => {
  useEffect(() => {
    // 自分あてに送られたメッセージを取得する
    props.readMessageEvents(props.authToken)
    // 自分が送信したメッセージを取得する
    props.readSendMessageEvents(props.authToken)
    // 自分のプラン購入者、一覧を取得する
    props.readPurchasersEvent(props.authToken)
  }, [])

  // 受信したメッセージと送信したメッセージを読み込んだら
  // 受信・送信メッセージの一覧をページに表示する
  if (props.isloadedRecieveMessage === true && props.isloadedSenderMessage === true) {
    props.readMessageListEvent()
  }
  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="center">
        {/* pc用 */}
        <Col xs={0} md={18} style={{ marginTop: 48 }}>
          <h2 style={{ textAlign: 'center' }}>メッセージ</h2>
        </Col>
        <Col xs={22} md={0} style={{ marginTop: 16 }}>
          <h3>メッセージ</h3>
        </Col>
      </Row>

      {/* pc用 タブ */}
      <Row type="flex" justify="center">
        <Col xs={0} md={22} lg={18} style={{ marginTop: 16, minHeight: 720 }}>
          <Tabs type="card" defaultActiveKey="1">
            {/* メッセージリストのタブ */}
            <Tabs.TabPane tab="メッセージ一覧" key="1">
              {/* <MessageTable recieveMessage={props.recieveMessage} /> */}
              <MessageTable topMessageList={props.messageTableList} />
            </Tabs.TabPane>

            {/* メッセージ作成ページのタブ */}
            <Tabs.TabPane tab="メッセージを作成" key="2">
              <MessageSendTab />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>

      {/* スマ用のメッセージ一覧 */}
      <Row type="flex" justify="center">
        <Col xs={22} md={0} style={{ minHeight: 700, marginBottom: 72 }}>
          <Tabs defaultActiveKey="1" size="small">
            {/* メッセージリストのタブ */}
            <Tabs.TabPane tab="受信" key="1">
              <MobileMessageTable recieveMessage={props.recieveMessage} />
            </Tabs.TabPane>

            {/* メッセージ作成ページのタブ */}
            <Tabs.TabPane tab="作成" key="2">
              {/* <MessageSendTab /> */}
              <MobileMessageSendTab />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  // 受信箱にあるメッセージ
  recieveMessage: state.message.recieveMessage,
  isloadedRecieveMessage: state.message.isloadedRecieveMessage,
  // 自分が送信したメッセージ
  isloadedSenderMessage: state.message.isloadedSenderMessage,
  // メッセージリスト
  messageTableList: state.message.messageTableList,
  authToken: state.account.authToken.access,
})

const mapDispatchToProps = (dispatch) => ({
  // 自分あてに送られたメッセージを取得する
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
  // 自分が送信したメッセージを取得する
  readSendMessageEvents: (authToken) => dispatch(feachSendMessageList(authToken)),
  // 自分宛に届いたプランリクエスト一覧を取得する(契約済みのプランも入る)
  // ※ここで取得しておかないと、メッセージルームページに移動した時に、承認アラートのところでエラーになる
  readPurchasersEvent: (authToken) => dispatch(feachPurchasersList(authToken)),
  // メッセージのトップページに表示させる送信・受信のメッセージ一覧を取得する
  readMessageListEvent: () => dispatch(readTopPageMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)
