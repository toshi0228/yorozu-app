import React, { useState } from 'react'
import { Comment, Avatar, Form, Input, Button } from 'antd'
import host from '../../../constants/url'

const MessageForm = (props) => {
  const [comment, setComment] = useState('')

  const onSubmit = () => {
    console.log(comment)
    console.log('送信ボタンが押された')
    setComment('')
  }

  return (
    <>
      <Comment
        avatar={<Avatar src={`${host.localhost()}${props.senderProfileImage}`} alt="you" />}
        // contentを書くことによって、アバターの横にアイテムを書くことができる
        content={
          <>
            <Form.Item>
              <Input.TextArea rows={4} onChange={(e) => setComment(e.target.value)} value={comment} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" onClick={onSubmit}>
                コメントを送信
              </Button>
            </Form.Item>
          </>
        }
      />
    </>
  )
}

export default MessageForm
