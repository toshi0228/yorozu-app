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

  const data = [
    {
      profileImage: (
        <Badge dot={isShow}>
          <Avatar src="https://pbs.twimg.com/profile_images/634661956226453504/voNBeTp9_400x400.jpg" onClick={() => setIsShow(false)} />
        </Badge>
      ),
      user: '何でも屋',
      day: '2021年10月24',
      messageContent: 'ななななああああああああああああああああああああああ',
      key: 'day',
    },
  ]

  // メッセージデータのリストを取り出す
  props.recieveMessage.forEach((message) => {
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
      messageContent: <Link to={`/message/rooms/${message.senderYorozuId}`}>{message.messageContent}</Link>,
      key: message.createdAt,
    }
    data.push(oneMessageData)
  })

  return (
    <>
      <div>メッセージ</div>
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
