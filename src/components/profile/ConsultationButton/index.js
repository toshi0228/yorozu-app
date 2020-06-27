import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input } from 'antd'
import { sendMessage } from '../../../store/actions/message'

// ====================================================================
// 相談ボタンとクリックした時に起動するモーダル
// ====================================================================

const ConsultationButton = (props) => {
  // isVisibleがfalseだとモーダルが非表示になる
  const [isVisible, setIsVisible] = useState(false)
  const [modalInputText, setModalInputText] = useState('')

  // 相談するボタンを押した時の処理
  const showModal = () => {
    setIsVisible(true)
  }

  // モーダルで送信ボタンを押した時の処理
  const hundleSubmit = () => {
    setIsVisible(false)

    // keyの値ははdjangoのモデル名と一緒にしないといけない
    // keyは、djangoでキャメルケースから、自動でスネークケースに変換してくれる
    const messageData = {
      senderYorozuId: props.loginUser.yorozuId,
      receiverYorozuId: props.data.yorozuId,
      messageContent: modalInputText,
    }
    console.log(messageData)
    props.sendMessageEvent(messageData)
  }

  // モーダルでキャンセルボタンを押した時の処理
  const handleCancel = () => {
    setIsVisible(false)
  }
  return (
    <div>
      <Button onClick={showModal}>相談をする</Button>
      <Modal
        title={`${props.data.nickname}さんにメッセージで相談をする`}
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
          気になったら、まずは教えてほしいことを相談！
          <br />
          希望にあうマッチングをするために、よろずには現在の状況、
          <br />
          困っていること、 目標など、できるだけ詳しく送りましょう。
        </p>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 12 }}
          placeholder="もう少し具体的にどんなことをするか教えてください！"
          onChange={(e) => setModalInputText(e.target.value)}
        />
        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.profile.profileDetail,
  loginUser: state.account,
})

const mapStateToDispatch = (dispatch) => ({
  sendMessageEvent: (message) => dispatch(sendMessage(message)),
})

export default connect(mapStateToProps, mapStateToDispatch)(ConsultationButton)
