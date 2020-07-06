import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Table, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import host from '../../../constants/url'
import routes from '../../../routes'

import { alreadyRead } from '../../../store/actions/message'

const MessageTable = (props) => {
  // メッセージを確認した時の処理
  // message.unreadがtrueの場合は、未読の状態なので、既読の処理をする
  const read = (message) => {
    if (message.unread) {
      props.alreadyReadEvent(message)
    }
  }

  const columns = [
    { title: 'ユーザー', dataIndex: 'profileImage' },
    { title: '名前', dataIndex: 'user' },
    { title: '日にち', dataIndex: 'day' },
    { title: '内容', dataIndex: 'messageContent' },
  ]

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
      profileImage: (
        <Link to={routes.createMessage(message.senderYorozuId)}>
          <Badge dot={message.unread} onClick={() => read(message)}>
            <Avatar src={`${host.localhost()}${message.senderProfile.profileImage}`} />
          </Badge>
        </Link>
      ),
      user: (
        <Link to={routes.createMessage(message.senderYorozuId)} onClick={() => read(message)}>
          {message.senderProfile.nickname}
        </Link>
      ),
      day: (
        <Link to={routes.createMessage(message.senderYorozuId)} onClick={() => read(message)}>
          {message.createdAt.split('T')[0]}
        </Link>
      ),
      messageContent: (
        <Link to={routes.createMessage(message.senderYorozuId)} onClick={() => read(message)}>
          {messageText}
        </Link>
      ),
      key: index,
    }
    data.push(oneMessageData)
  })

  return (
    <>
      <Row type="flex" justify="end">
        <Col>
          <p>{`未読メッセージ${unreadMessageList.length}件`}</p>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data}></Table>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  // メッセージの状態を既読にする
  alreadyReadEvent: (message) => dispatch(alreadyRead(message)),
})

export default connect(null, mapDispatchToProps)(MessageTable)
