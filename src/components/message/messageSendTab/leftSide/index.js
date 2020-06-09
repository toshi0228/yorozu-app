import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Comment, List, Row, Col, Modal } from 'antd'
import MessageForm from '../../../form/messageForm/index'
import host from '../../../../constants/url'
import { feachMessageList, feachSendMessageList, readRoomMessage } from '../../../../store/actions/message'
import { patchPlanApproval } from '../../../../store/actions/request'
import styles from './index.module.scss'

const LeftSide = (props) => {
  console.log('LeftSideが呼ばれた')
  console.log(props)
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

  const showConfirm = () => {
    Modal.confirm({
      title: `${props.messageRoomUser}のプランリクエストを承諾しますか?`,
      content: `承諾することによって、${props.messageRoomUser}さんは、プランに関して、本契約のリクエストを送ることができるようになります!`,
      onOk() {
        console.log('OK')
        props.planRequestApprovalEvent()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

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

      <Row style={{ marginTop: 8 }}>
        <Col span={24}>
          <div style={{ color: 'red', fontSize: 10 }}>
            のびaaa太さんから、プランリクエストが来ています(※まだ本契約ではありません)。承認することによってのび太さんは、
            <br />
            本契約のリクエストができるようになります。承認する場合は、「承認する」を押してください
            <span className={styles.btn} onClick={showConfirm}>
              {/* <div title={`${props.messageRoomUser}さんのリクエストを承認しますか`} okText="はい" cancelText="いいえ"> */}
              承認する
            </span>
          </div>
        </Col>
      </Row>

      {/* メッセージフォーム */}
      {/* <Row style={{ marginTop: 10 }}> */}
      <Row>
        <Col span={24}>
          <MessageForm
            senderProfileImage={props.senderProfileImage}
            readRoomMessageEvents={props.readRoomMessageEvents}
            readMessageEvents={props.readMessageEvents}
            readSendMessageEvents={props.readSendMessageEvents}
          />
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
  // よろずやのメッセージフォームのアイコン画像
  senderProfileImage: state.message.senderProfileImage,
  messageRoomUser: state.message.messageRoomUser,
})

const mapDispatchToProps = (dispatch) => ({
  // メッセージルームのよろずIDごとにメッセージを呼び出す
  readRoomMessageEvents: (roomUserYorozuId) => dispatch(readRoomMessage(roomUserYorozuId)),
  // 自分あてに送られたメッセージを取得する
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
  // 自分が送信したメッセージを取得する
  readSendMessageEvents: (authToken) => dispatch(feachSendMessageList(authToken)),
  // お客さんのプランリクエストの承認の処理
  planRequestApprovalEvent: (planRequestUser) => dispatch(patchPlanApproval(planRequestUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide)
