import React from 'react'
import { connect } from 'react-redux'
import { Comment, List, Row, Col } from 'antd'
import MessageForm from '../../../formRelated/messageForm/index'
import host from '../../../../constants/url'

const LeftSide = (props) => {
  console.log('leftSide')

  const data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          未経験業種で培った「相手の知識レベルに合わせて言葉選びを変える」スキルとそのために自分から学んでいく姿勢をデザイン、イラストを掛け合わせた仕事はなんだろうかと考えた時、Webデザインにたどり着き、独学での勉強を始めました。
        </p>
      ),
      datetime: '2021年10月23日',
    },
    {
      author: 'Han Sssolo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          未経験業種で培った「相手の知識レベルに合わせて言葉選びを変える」スキルとそのために自分から学んでいく姿勢をデザイン、イラストを掛け合わせた仕事はなんだろうかと考えた時、Webデザインにたどり着き、独学での勉強を始めました。
        </p>
      ),
      datetime: '2021年10月29日',
    },
  ]

  // 送信者のメッセージルームに合わせて,メッセージ内容を変える
  props.roomMessage.forEach((message) => {
    const messageObj = {
      author: message.senderProfile.nickname,
      avatar: `${host.localhost()}${message.senderProfile.profileImage}`,
      content: <p>{message.messageContent}</p>,
      datetime: message.createdAt,
    }
    data.push(messageObj)
  })

  return (
    <>
      {/* <Row type="flex" style={{ marginBottom: 10 }}>
        <Col span={24}>
          <p>メッセージ</p>
        </Col>
      </Row> */}

      {/* メッセージフォーム */}
      <Row style={{ marginTop: 10 }}>
        <Col span={24}>
          <MessageForm />
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
})

// const mapDispatchToProps = (dispatch) => ({
//   // 自分あてに送られたメッセージを取得する
//   readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
//   // senderのIDごとにメッセージを呼び出す
//   readRoomMessageEvents: (senderYorozuId) => dispatch(readRoomMessage(senderYorozuId)),
// })

export default connect(mapStateToProps, null)(LeftSide)
