import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Comment, List, Row, Col, Modal } from 'antd'
import MessageForm from '../../../../form/messageForm/pc/index'

import { feachMessageList, feachSendMessageList, readRoomMessage } from '../../../../../store/actions/message'
import { checkPurchasePlan, planRequestApproval } from '../../../../../store/actions/planContract'
import styles from './index.module.scss'

// ====================================================================================
// メッセージルームの左側のページ
// ユーザーを変更するたびに処理が動く つまり、ユーザーごとにする処理がある場合は、ここに書く
// ====================================================================================

const LeftSide = (props) => {
  const [explanation, setExplanation] = useState('メッセージを送りたいユーザーを選んでね')
  const data = []

  // 送信者のメッセージルーム(トークルーム)に合わせて,メッセージ内容を変える
  props.roomMessage.forEach((message, index) => {
    const messageObj = {
      author: message.senderProfile.nickname,
      avatar: message.senderProfile.profileImage,
      content: <p>{message.messageContent}</p>,
      datetime: message.createdAt,
      key: index,
    }
    data.push(messageObj)
  })

  // プランリクエストの承認ボタンを押した時のアクション
  const showConfirm = () => {
    Modal.confirm({
      title: `${props.messageRoomUser}さんの契約申請を承諾しますか?`,
      onOk() {
        const contractPlanId = props.clientPurchasePlan.contractPlan.id
        const contractPlan = {
          purchaser: props.roomUserYorozuId,
          contractPlanId,
        }
        props.planRequestApprovalEvent(contractPlan)
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
    // 自分宛に届いたプランリクエストリストの中から、messageRoomUserが契約してくれたプランがあるか確認
    props.checkPurchasePlanEvent(props.roomUserYorozuId)
  }, [props.messageRoomUser, props.purchasersList])

  // プランリクエストがきた場合のアラート
  const toggleRequestAlert = () => {
    if (props.isPlanRequest === true && props.clientPurchasePlan.isApproval === false) {
      return (
        <Row style={{ marginTop: 8 }}>
          <Col span={24}>
            <div style={{ color: 'red', fontSize: 10 }}>
              {`${props.messageRoomUser}さんから、「${props.clientPurchasePlan.contractPlan.title}」プランの契約リクエストが来ています。`}
              承認する場合は、「承認する」を押してくださいね。承認してからが、契約が成立になります。
              <span className={styles.btn} onClick={showConfirm}>
                承認する
              </span>
            </div>
          </Col>
        </Row>
      )
    }
  }

  return (
    <>
      <Row type="flex" style={{ marginTop: 10, paddingTop: 8 }}>
        {/* <Col span={24}>{`${props.messageRoomUser}にメッセージを送ります`}</Col> */}
        <Col span={24}>{explanation}</Col>
      </Row>

      {/* プランリクエストがきた場合のアラート */}
      {toggleRequestAlert()}

      {/* メッセージフォーム */}
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
  // メッセールームユーザーが購入してくれたプラン
  clientPurchasePlan: state.planContract.clientPurchasePlan,
  // トークルームユーザーのプランリクエストがあるかどうか
  isPlanRequest: state.planContract.isPlanRequest,
})

const mapDispatchToProps = (dispatch) => ({
  // メッセージルームのよろずIDごとにメッセージを呼び出す
  readRoomMessageEvents: (roomUserYorozuId) => dispatch(readRoomMessage(roomUserYorozuId)),
  // 自分あてに送られたメッセージを取得する
  readMessageEvents: (authToken) => dispatch(feachMessageList(authToken)),

  // 自分が送信したメッセージを取得する
  readSendMessageEvents: (authToken) => dispatch(feachSendMessageList(authToken)),
  // お客さんのプランリクエストの承認の処理
  planRequestApprovalEvent: (contractPlan) => dispatch(planRequestApproval(contractPlan)),

  // 自分宛に届いたプランリクエストリストの中から、messageRoomUserが契約してくれたプランがあるか確認
  checkPurchasePlanEvent: (roomUserYorozuId) => dispatch(checkPurchasePlan(roomUserYorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide)
