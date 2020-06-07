import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input, message } from 'antd'
import { planRequest } from '../../../store/actions/plan'
import { sendMessage } from '../../../store/actions/message'

// ====================================================================
// プランリクエストのモーダル
// ====================================================================

const PlanRequestModal = (props) => {
  console.log('PlanRequestModal')
  console.log(props)
  const [isVisible, setIsVisible] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')
  const showModal = () => {
    setIsVisible(true)
  }

  const hundleSubmit = () => {
    // requestDataは、プランのリクエストの時に必要な情報
    const requestData = {
      // リクエストの送り主(ログインしているユーザー)
      senderYorozuId: props.loginUserYorozuId,
      // リクエストの送り先のユーザー(プランオーナーのyorozuId)
      receiverYorozuId: props.planOwnerYorozuId,
    }

    // requestMessageDataは、モーダルに書き込んだテキストメッセージをプランオーナーに送る
    // ※プランオーナーは、メッセージをメッセージルームで確認することができる
    const requestMessageData = {
      // リクエストの送り主(ログインしているユーザー)
      senderYorozuId: props.loginUserYorozuId,
      // リクエストの送り先のユーザー(プランオーナーのyorozuId)
      receiverYorozuId: props.planOwnerYorozuId,
      messageContent: requestMessage,
    }

    setIsVisible(false)
    // props.planRequestEvent(modalInputText)
    props.planRequestEvent(requestData)
    props.sendMessageEvent(requestMessageData)
  }

  const handleCancel = () => {
    setIsVisible(false)
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        リクエストを送る
      </Button>
      <Modal
        title="リクエスト"
        visible={isVisible}
        onOk={hundleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={hundleSubmit}>
            送信
          </Button>,
        ]}
      >
        <p style={{ marginBottom: 20 }}>
          よろず屋がプランリクエストを承認した後に、契約ができるように <br />
          なります。 相談内容を記入した上でよろず屋と契約が可能かどうか確認しましょう。
        </p>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 12 }}
          placeholder="契約を考えているので、承認をお願いいたします"
          onChange={(e) => setRequestMessage(e.target.value)}
        />
        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.profile,
  // リクエストの送り主(ログインしているユーザー)
  loginUserYorozuId: state.account.yorozuId,
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,
})

const mapStateToDispatch = (dispatch) => ({
  // プランのリクエストを送るアクション
  planRequestEvent: (requestData) => dispatch(planRequest(requestData)),
  // プランリクエストのメッセージを送る処理
  sendMessageEvent: (messageData) => dispatch(sendMessage(messageData)),
})

export default connect(mapStateToProps, mapStateToDispatch)(PlanRequestModal)
