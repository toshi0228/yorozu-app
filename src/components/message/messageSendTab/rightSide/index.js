import React from 'react'
import { Table, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes'

const leftSide = () => {
  const columns = [
    { title: 'ユーザーリスト', dataIndex: 'user', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
    { title: '', dataIndex: 'profileImage', render: (text) => <Link to={routes.messageRoom}>{text}</Link> },
  ]

  const data = [
    {
      profileImage: (
        <Badge>
          <Avatar src="https://pbs.twimg.com/profile_images/634661956226453504/voNBeTp9_400x400.jpg" />
        </Badge>
      ),
      user: 'aaaa',
      key: 'user',
    },
    {
      profileImage: <Avatar src="https://pbs.twimg.com/profile_images/634661956226453504/voNBeTp9_400x400.jpg" />,
      user: '何でもももも屋',
      key: 'user',
    },
  ]
  return (
    <>
      {/* <p>ユーザー</p> */}
      <p>ユーザーリスト</p>
      <hr style={{ backgroundColor: '#E8E8E8', height: 0.5, margin: 0, border: 0 }}></hr>
      <Table columns={columns} dataSource={data} pagination={false} showHeader={false}></Table>
    </>
  )
}

export default leftSide
