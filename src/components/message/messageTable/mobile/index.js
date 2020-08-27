import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Table, Avatar, Badge, List } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes'

import { alreadyRead } from '../../../../store/actions/message'

// ==========================================================================
// スマホ用のメッセージテーブル 内容が見れない仕様
// ==========================================================================

const MobileMessageTable = (props) => {
  // メッセージを確認した時の処理
  // message.unreadがtrueの場合は、未読の状態なので、既読の処理をする
  const read = (message) => {
    // {id: "20a27755-b4ee-4a69-bab6-c8f520533252", senderYorozuId: "shizuka", receiverYorozuId: "nobita", messageContent: "こんにちは！", senderProfile: {…}, …}
    console.log('呼ばれた')
    console.log(message)
    if (message.unread) {
      props.alreadyReadEvent(message)
    }
  }

  // メッセージのリストが入る
  const data = []

  // 未読のメッセージリスト
  const unreadMessageList = []

  // メッセージデータのリストを取り出す
  props.recieveMessage.forEach((message, index) => {
    // 未読のメッセージを抽出する
    if (message.unread) {
      unreadMessageList.push(message)
    }

    // メッセージが長い場合、文末を...で省略する
    const messageText = message.messageContent.length > 20 ? message.messageContent.slice(0, 40) + '…' : message.messageContent
    const oneMessageData = {
      messageData: message,
      profileImage: message.senderProfile.profileImage,
      title: message.senderProfile.nickname,
      day: message.createdAt.split('T')[0],
      messageContent: messageText,
      unread: message.unread,
      senderYorozuId: message.senderYorozuId,
      key: index,
    }
    data.push(oneMessageData)
  })

  return (
    <>
      <Row type="flex" justify="start" style={{ marginTop: 20, borderBottom: 'solid 1px #e8e8e8' }}>
        <Col>
          <p>{`未読メッセージ${unreadMessageList.length}件`}</p>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Link to={routes.createMessage(item.senderYorozuId)}>
                  <Badge dot={item.unread} onClick={() => read(item.messageData)}>
                    <Avatar src={item.profileImage} />
                  </Badge>
                </Link>
              }
              title={
                <Link to={routes.createMessage(item.senderYorozuId)}>
                  <Row type="flex" justify="space-between">
                    <Col>{item.title}</Col>
                    <Col style={{ fontSize: 10 }}>{item.day}</Col>
                  </Row>
                </Link>
              }
              description={<Link to={routes.createMessage(item.senderYorozuId)}>{item.messageContent}</Link>}
            />
          </List.Item>
        )}
      />
      {/* 下のグレイの線 */}
      <Row style={{ borderBottom: 'solid 1px #e8e8e8' }}></Row>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  // メッセージの状態を既読にする
  alreadyReadEvent: (message) => dispatch(alreadyRead(message)),
})

export default connect(null, mapDispatchToProps)(MobileMessageTable)
