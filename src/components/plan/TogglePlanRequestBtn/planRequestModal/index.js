import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input } from 'antd'
import { planRequest } from '../../../../store/actions/plan'
import { sendMessage } from '../../../../store/actions/message'

// ====================================================================
// プランリクエストのモーダル
// ====================================================================

const PlanRequestModal = (props) => {
  console.log('PlanRequestModal')
  console.log(props)
  // プランリクエストする時のメッセージ
  const [requestMessage, setRequestMessage] = useState('')

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // requestDataは、プランのリクエストの時に必要な情報
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const requestData = {
    // リクエストの送り主(ログインしているユーザー)
    senderYorozuId: props.loginUserYorozuId,
    // リクエストの送り先のユーザー(プランオーナーのyorozuId)
    receiverYorozuId: props.planOwnerYorozuId,
  }
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // requestMessageDataは、モーダルに書き込んだテキストメッセージをプランオーナーに送る
  // ※プランオーナーは、メッセージをメッセージルームで確認することができる
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const requestMessageData = {
    // リクエストの送り主(ログインしているユーザー)
    senderYorozuId: props.loginUserYorozuId,
    // リクエストの送り先のユーザー(プランオーナーのyorozuId)
    receiverYorozuId: props.planOwnerYorozuId,
    messageContent: requestMessage,
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // モーダルの中での送信ボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const hundleSubmit = () => {
    // プランのリクエストの処理
    props.planRequestEvent(requestData)
    // プランのリクエストした時のメッセージをプランオーナーに送信
    props.sendMessageEvent(requestMessageData)
    // 送信したら、メッセージのデータを初期化する
    setRequestMessage('')
    // 送信ボタンを押したらモダールを閉じる
    props.setIsPlanRequestModalVisible(false)
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // モーダルの中でのキャンセルボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const handleCancel = () => {
    props.setIsPlanRequestModalVisible(false)
  }

  return (
    <div>
      <Modal
        title="リクエスト"
        // visiblがtrueなら、モーダルが表示される
        visible={props.isPlanRequestModalVisible}
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
