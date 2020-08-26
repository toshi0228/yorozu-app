import React from 'react'
import { Row, Col } from 'antd'
// import RightSide from '../pc/rightSide'
import MessageRoom from './messageRoom'

// ==================================================
// メッセージルーム モバイル用
// ==================================================

const MessageSendTab = () => {
  return (
    <>
      <Row type="flex">
        <Col span={24}>
          <MessageRoom />
        </Col>
        {/* <Col offset={1} span={5} style={{ marginTop: 20 }}>
          <RightSide />
        </Col> */}
      </Row>
    </>
  )
}

export default MessageSendTab
