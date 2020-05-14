import React, { useState } from 'react'
import { Row, Col, Table, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../routes'

const MessageTable = () => {
  const [isShow, setIsShow] = useState(true)
  const columns = [
    { title: 'ユーザー', dataIndex: 'profileImage', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '名前', dataIndex: 'user', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '日にち', dataIndex: 'day', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '内容', dataIndex: 'messageContent', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
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
    {
      profileImage: <Avatar src="https://pbs.twimg.com/profile_images/634661956226453504/voNBeTp9_400x400.jpg" />,
      user: '何でも屋',
      day: '2021年10月24',
      messageContent: 'ななななああああああああああああああああああああああ',
      key: 'user',
    },
  ]
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
