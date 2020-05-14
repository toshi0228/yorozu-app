import React from 'react'
import { Comment, List, Row, Col } from 'antd'
// import MessageForm from '../../formRelated/messageForm'
import RightSide from './rightSide'
import LeftSide from './leftSide'

// メッセージ作成中

const MessageSend = () => {
  const data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: '2021年10月23日',
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: '2021年10月23日',
    },
  ]

  return (
    <>
      <Row type="flex">
        <Col span={18}>
          <LeftSide />
        </Col>
        <Col offset={1} span={5} style={{ marginTop: 20 }}>
          <RightSide />
        </Col>
      </Row>
    </>
  )
}

export default MessageSend
