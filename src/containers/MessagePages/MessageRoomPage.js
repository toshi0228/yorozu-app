import React from 'react'
import { Comment, List, Row, Col } from 'antd'
import MessageForm from '../../components/formRelated/messageForm/index'

const MessageRoomPage = () => {
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
      <Row type="flex" style={{ marginBottom: 10 }}>
        <Col offset={3} span={18}>
          <p>メッセージ</p>
          {/* <hr /> */}
        </Col>
      </Row>

      {/* メッセージフォーム */}
      <Row>
        <Col offset={3} span={18}>
          <MessageForm />
        </Col>
      </Row>

      <Row type="flex">
        <Col offset={3} span={16}>
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

export default MessageRoomPage
