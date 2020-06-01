import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Comment, List, Row, Col } from 'antd'
import MessageForm from '../../../form/messageForm/index'
import host from '../../../../constants/url'

const LeftSide = (props) => {
  const [explanation, setExplanation] = useState('メッセージを送りたいユーザーを選んでね')
  const data = []

  // 送信者のメッセージルームに合わせて,メッセージ内容を変える
  props.roomMessage.forEach((message, index) => {
    const messageObj = {
      author: message.senderProfile.nickname,
      avatar: `${host.localhost()}${message.senderProfile.profileImage}`,
      content: <p>{message.messageContent}</p>,
      datetime: message.createdAt,
      key: index,
    }
    data.push(messageObj)
  })

  // メッセージを送信するタブごとに、メッセージルームの説明を変更する
  useEffect(() => {
    if (props.messageRoomUser) {
      setExplanation(`${props.messageRoomUser}さんにメッセージを送ります`)
    }
  }, [props.messageRoomUser])

  return (
    <>
      <Row type="flex" style={{ marginTop: 10, paddingTop: 8 }}>
        {/* <Col span={24}>{`${props.messageRoomUser}にメッセージを送ります`}</Col> */}
        <Col span={24}>{explanation}</Col>
      </Row>

      {/* メッセージフォーム */}
      {/* <Row style={{ marginTop: 10 }}> */}
      <Row>
        <Col span={24}>
          <MessageForm senderProfileImage={props.senderProfileImage} />
        </Col>
      </Row>

      <Row type="flex">
        {/* <Col offset={3} span={16}> */}
        <Col span={24}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <li>
                <Comment author={item.author} avatar={item.avatar} content={item.content} datetime={item.datetime} />
              </li>
            )}
          />
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  roomMessage: state.message.roomMessage,
  senderProfileImage: state.message.senderProfileImage,
  senderProfileImage: state.message.senderProfileImage,
  messageRoomUser: state.message.messageRoomUser,
})

// const mapDispatchToProps = (dispatch) => ({
//   // 自分あてに送られたメッセージを取得する
//   readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
//   // senderのIDごとにメッセージを呼び出す
//   readRoomMessageEvents: (senderYorozuId) => dispatch(readRoomMessage(senderYorozuId)),
// })

export default connect(mapStateToProps, null)(LeftSide)