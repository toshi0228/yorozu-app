import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Comment, List, Row, Col, Modal } from 'antd'
import MessageForm from '../../../form/messageForm/index'
import host from '../../../../constants/url'
import { feachMessageList, feachSendMessageList, readRoomMessage } from '../../../../store/actions/message'
import { patchPlanApproval, readRoomMessageUserPlanRequest } from '../../../../store/actions/planRequest'
import styles from './index.module.scss'

// ====================================================================================
// メッセージルームの左側のページ
// ユーザーを変更するたびに処理が動く つまり、ユーザーごとにする処理がある場合は、ここに書く
// ====================================================================================

const LeftSide = (props) => {
  const [explanation, setExplanation] = useState('メッセージを送りたいユーザーを選んでね')
  const [isPlanRequest, setIsPlanRequest] = useState(false)
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

  // プランリクエストの承認ボタンを押した時のアクション
  const showConfirm = () => {
    Modal.confirm({
      title: `${props.messageRoomUser}さんのプランリクエストを承諾しますか?`,
      onOk() {
        console.log('OK')
        props.planRequestApprovalEvent(props.roomUserYorozuId)
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
    // メッセージルームページのユーザーよって、プランリクエストのユーザーを取得する
    props.readRoomUserPlanRequestEvent(props.roomUserYorozuId)
  }, [props.messageRoomUser])

  // ルームユーザーにプランのリクエストがあり、なおかつまだリクエストを承認していなければ、アラートを表示させる
  useEffect(() => {
    // console.log('承認確認')
    // console.log(props.roomUserPlanRequest)

    // props.roomUserPlanRequest.isApproval => プランリクエストの承認状態 falseなら承認されていない
    if (props.roomUserPlanRequest && props.roomUserPlanRequest.isApproval === false) {
      setIsPlanRequest(true)
    } else {
      setIsPlanRequest(false)
    }
  }, [props.roomUserPlanRequest])

  return (
    <>
      <Row type="flex" style={{ marginTop: 10, paddingTop: 8 }}>
        {/* <Col span={24}>{`${props.messageRoomUser}にメッセージを送ります`}</Col> */}
        <Col span={24}>{explanation}</Col>
      </Row>

      {/* プランリクエストがきた場合のアラート */}
      {/* isPlanRequestが, trueの時だけコンポーネントが表示される */}
      {isPlanRequest && (
        <Row style={{ marginTop: 8 }}>
          <Col span={24}>
            <div style={{ color: 'red', fontSize: 10 }}>
              {`${props.messageRoomUser}さんから、プランリクエストが来ています(※まだ本契約ではありません)。承認された後に${props.messageRoomUser}さんは、`}
              <br />
              本契約のプランリクエストを送ることができるようになります。承認する場合は、「承認する」を押してくださいね
              <span className={styles.btn} onClick={showConfirm}>
                承認する
              </span>
            </div>
          </Col>
        </Row>
      )}

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
  // メッセールームユーザーのyorozuId
  roomUserYorozuId: state.message.roomUserYorozuId,
  // メッセールームユーザーの名前
  messageRoomUser: state.message.messageRoomUser,
  // メッセージルームルームユーザーのプランリクエストに関して
  roomUserPlanRequest: state.planRequest.roomMessageUserPlanRequest,
})

const mapDispatchToProps = (dispatch) => ({
  // メッセージルームのよろずIDごとにメッセージを呼び出す
  readRoomMessageEvents: (roomUserYorozuId) => dispatch(readRoomMessage(roomUserYorozuId)),
  // 自分あてに送られたメッセージを取得する
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),
  // 自分が送信したメッセージを取得する
  readSendMessageEvents: (authToken) => dispatch(feachSendMessageList(authToken)),
  // お客さんのプランリクエストの承認の処理
  planRequestApprovalEvent: (roomUserYorozuId) => dispatch(patchPlanApproval(roomUserYorozuId)),
  // メッセージルームページのユーザーよって、プランリクエストのユーザーを取得する
  readRoomUserPlanRequestEvent: (roomUserYorozuId) => dispatch(readRoomMessageUserPlanRequest(roomUserYorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide)
