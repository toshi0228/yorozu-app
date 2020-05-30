import React, { useState } from 'react'
import { Row, Col, Table, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../routes'
import host from '../../../constants/url'

const MessageTable = (props) => {
  console.log(props)
  const [isShow, setIsShow] = useState(true)
  // const [data, setData] = useState([])
  const columns = [
    { title: 'ユーザー', dataIndex: 'profileImage', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '名前', dataIndex: 'user', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '日にち', dataIndex: 'day', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '内容', dataIndex: 'messageContent', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
  ]

  // 初回はデータがないのでデータがない場合forEachがエラーになるのでif文

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

  if (props.data != '') {
    props.data.forEach((message) => {
      const oneMessageData = {
        profileImage: (
          <Badge dot={isShow}>
            <Avatar src={`${host.localhost()}${message.senderProfile.profileImage}`} onClick={() => setIsShow(false)} />
          </Badge>
        ),
        user: message.senderProfile.nickname,
        day: message.createdAt.split('T')[0],
        messageContent: message.messageContent,
        key: message.createdAt,
      }
      data.push(oneMessageData)
    })
  }

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
