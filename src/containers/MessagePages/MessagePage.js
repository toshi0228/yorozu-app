import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import MessageSendTab from '../../components/message/messageSendTab'
import MessageTable from '../../components/message/messageTable'
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
        <Col offset={3} style={{ fontSize: 18 }}>
          メッセージ
        </Col>
      </Row>

      {/* タブ */}
      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col span={18}>
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
