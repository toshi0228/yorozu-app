import React from 'react'
import { connect } from 'react-redux'
import { Table, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import { readRoomMessage } from '../../../../store/actions/message'
import routes from '../../../../routes/index'

const RightSide = (props) => {
  const columns = [
    { title: 'ユーザーリスト', dataIndex: 'user' },
    { title: '', dataIndex: 'profileImage' },
  ]

  // ユーザーリストのデータをこの中に入れる
  const data = []

  props.userList.forEach((user, index) => {
    const userData = {
      profileImage: (
        // プロフィールイメージを押した時に、メッセージルームの内容が変化するようにする
        // <Link to={`/message/rooms/${user.senderYorozuId}`} onClick={() => props.readRoomMessageEvents(user.senderYorozuId)}>
        <Link to={routes.createMessage(user.senderYorozuId)} onClick={() => props.readRoomMessageEvents(user.senderYorozuId)}>
          <Badge>
            <Avatar src={user.senderProfile.profileImage} />
          </Badge>
        </Link>
      ),
      user: (
        // ユーザー名を押した時に、メッセージルームの内容が変化するようにする
        <Link to={routes.createMessage(user.senderYorozuId)} onClick={() => props.readRoomMessageEvents(user.senderYorozuId)}>
          {user.senderProfile.nickname}{' '}
        </Link>
      ),
      key: index,
    }
    data.push(userData)
  })

  return (
    <>
      {/* <p>ユーザー</p> */}
      <p>ユーザーリスト</p>
      <hr style={{ backgroundColor: '#E8E8E8', height: 0.5, margin: 0, border: 0 }}></hr>
      <Table columns={columns} dataSource={data} pagination={false} showHeader={false}></Table>
    </>
  )
}

const mapStateToProps = (state) => ({
  userList: state.message.recieveMessage,
})

const mapDispatchToProps = (dispatch) => ({
  // ユーザーリストからユーザーを押した時に、メッセージルームの内容が変化するようにする
  readRoomMessageEvents: (yorozuId) => dispatch(readRoomMessage(yorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RightSide)
