import React from 'react'
import { Col, Row, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

const MessagePage = ({ id }) => {
  return (
    <>
      <Row type="flex" style={{ marginBottom: 10 }}>
        <Col offset={3} span={18}>
          <p>メッセージ</p>
          {/* <hr /> */}
        </Col>
      </Row>
      <Row type="flex" style={{ marginTop: 40 }}>
        <Col style={{ border: 1 }} offset={3} span={16}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={
                    <Link to="/message/rooms/1111">
                      {item.title}
                      <span style={{ marginLeft: 40, fontSize: 12 }}>2021年10月23日</span>
                    </Link>
                  }
                  description="ここから、slackを登録してくださいねああああああああああああああああああああ"
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}

export default MessagePage

// const MessagePage = ({ id }) => {
//   return (
//     <Row type="flex" justify="center">
//       <Col style={{ backgroundColor: 'yellow' }} span={18}>
//         <div>メッセージページ</div>
//         <Card style={{ width: 300 }}>
//           <Row type="flex">
//             <Col>名前</Col>
//             <Col>2021年10月24日</Col>
//           </Row>
//           <div>今日も</div>
//         </Card>
//         <ul>
//           <Link to="/message/rooms/1111">
//             <li>万屋1</li>
//           </Link>
//           <Link to="/message/rooms/1111">
//             <li>万屋2</li>
//           </Link>
//           <Link to="/message/rooms/1111">
//             <li>万屋3</li>
//           </Link>
//         </ul>
//       </Col>
//     </Row>
//   );
// };

// export default MessagePage;
