import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import RightSide from './rightSide'
import LeftSide from './leftSide'

// メッセージ作成中

const MessageSendTab = () => {
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

export default MessageSendTab
