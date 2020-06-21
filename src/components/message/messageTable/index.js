import React, { useState } from 'react'
import { Row, Col, Table, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import host from '../../../constants/url'

const MessageTable = (props) => {
  const [isShow, setIsShow] = useState(true)

  const columns = [
    { title: 'ユーザー', dataIndex: 'profileImage' },
    { title: '名前', dataIndex: 'user' },
    { title: '日にち', dataIndex: 'day' },
    { title: '内容', dataIndex: 'messageContent' },
  ]

  // メッセージのリストが入る
  const data = []

  // メッセージデータのリストを取り出す
  props.recieveMessage.forEach((message, index) => {
    // メッセージが長い場合、文末を...で省略する
    const messageText = message.messageContent.length > 20 ? message.messageContent.slice(0, 40) + '…' : message.messageContent
    const oneMessageData = {
      profileImage: (
        <Link to={`/message/rooms/${message.senderYorozuId}`}>
          <Badge dot={isShow}>
            <Avatar src={`${host.localhost()}${message.senderProfile.profileImage}`} onClick={() => setIsShow(false)} />
          </Badge>
        </Link>
      ),
      user: <Link to={`/message/rooms/${message.senderYorozuId}`}>{message.senderProfile.nickname}</Link>,
      day: <Link to={`/message/rooms/${message.senderYorozuId}`}>{message.createdAt.split('T')[0]}</Link>,
      // messageContent: <Link to={`/message/rooms/${message.senderYorozuId}`}>{message.messageContent}</Link>,
      messageContent: <Link to={`/message/rooms/${message.senderYorozuId}`}>{messageText}</Link>,
      key: index,
    }
    data.push(oneMessageData)
  })

  return (
    <>
      <Row type="flex" justify="end">
        <Col>
          <p>{`未読メッセージ3件`}</p>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data}></Table>
    </>
  )
}

export default MessageTable
