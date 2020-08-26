import React, { useEffect, Component } from 'react'
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
import { feachMessageList, feachSendMessageList } from '../../store/actions/message'
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

  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="start">
        <Col xs={0} md={24} offset={3} style={{ fontSize: 18, marginTop: 48 }}>
          メッセージ
        </Col>
      </Row>

      {/* pc用 タブ */}
      <Row type="flex" justify="center">
        <Col xs={0} md={18} style={{ marginTop: 20, minHeight: 700 }}>
          <Tabs type="card" defaultActiveKey="1">
            {/* メッセージリストのタブ */}
            <Tabs.TabPane tab="メッセージ一覧" key="1">
              <MessageTable recieveMessage={props.recieveMessage} />
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
        <Col xs={22} md={0} style={{ marginTop: 20, minHeight: 700 }}>
          <Tabs defaultActiveKey="1" size="large">
            {/* メッセージリストのタブ */}
            <Tabs.TabPane tab="メッセージ一覧" key="1">
              <MobileMessageTable recieveMessage={props.recieveMessage} />
            </Tabs.TabPane>

            {/* メッセージ作成ページのタブ */}
            <Tabs.TabPane tab="メッセージを作成" key="2">
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
  recieveMessage: state.message.recieveMessage,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)
