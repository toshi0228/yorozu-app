import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Comment, Avatar, Form, Input, Button, Row, Col } from 'antd'

import { sendMessage } from '../../../../store/actions/message'
import { fetchLoginUserImage } from '../../../../store/actions/account'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// メッセージルームのメッセージフォーム
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const MessageForm = (props) => {
  const [comment, setComment] = useState('')
  // 送信中の時にtrueになり、ロードマークが出る
  const [submitting, setSubmitting] = useState(false)

  // 最初に、ログインユーザーの画像があるか、確認する
  useEffect(() => {
    if (props.loginUserImage['isUserImage'] === false) {
      props.readLoginUserImageEvent(props.loginUserYorozuId)
    }
  })

  const onSubmit = () => {
    setSubmitting(true)
    const messageData = {
      // メッセージの送り主(ログインしているユーザー)
      senderYorozuId: props.loginUserYorozuId,
      // メッセージの送り相手のyorozuId(メッセージルームユーザー)
      receiverYorozuId: props.roomUserYorozuId,
      messageContent: comment,
    }

    // メッセージの送信
    props.sendMessageEvent(messageData)

    // 親のコンポ
    // props.readMessageEvents(props.authToken)
    // props.readSendMessageEvents(props.authToken)
    // props.readRoomMessageEvents(props.roomUserYorozuId)

    setComment('')
    setSubmitting(false)
  }

  return (
    <>
      <Comment
        // avatar={<Avatar src={props.loginUserImage['image']} alt="you" />}
        // contentを書くことによって、アバターの横にアイテムを書くことができる
        content={
          <>
            <Form.Item>
              <Input.TextArea
                style={{ fontSize: 16 }}
                rows={4}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                autoSize={{ minRows: 4, maxRows: 8 }}
              />
            </Form.Item>

            <Form.Item>
              <Row type="flex" justify="center">
                <Col>
                  <Button
                    htmlType="submit"
                    type="primary"
                    block={true}
                    onClick={onSubmit}
                    loading={submitting}
                    // size="large"
                    style={{ width: 180 }}
                  >
                    コメントを送信
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </>
        }
      />
    </>
  )
}

// メッセージを送る時に必要な情報
const mapStateToProps = (state) => ({
  // メッセージの送り主(ログインしているユーザー)
  loginUserYorozuId: state.account.yorozuId,
  // メッセージの送り先のユーザー
  roomUserYorozuId: state.message.roomUserYorozuId,
  // authToken: state.account.authToken.access,
  loginUserImage: state.account.userImage,
})

const mapDispatchToProps = (dispatch) => ({
  sendMessageEvent: (messageData) => dispatch(sendMessage(messageData)),
  // // 自分宛にメッセージを送ってくれたルームユーザーのYorozuIdから、全てのメッセージを取得する(メッセージを送ったあとリーロードする)
  // readRoomMessageEvents: (roomUserYorozuId) => dispatch(readRoomMessage(roomUserYorozuId)),
  // ログインユーザーのイメーシを取得する
  readLoginUserImageEvent: (yorozuId) => dispatch(fetchLoginUserImage(yorozuId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
