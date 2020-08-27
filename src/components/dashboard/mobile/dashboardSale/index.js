import React from 'react'
import { Table, List, Avatar, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes'

// const columns

const DashboardSale = (props) => {
  const columns = [
    { title: '日にち', dataIndex: 'day' },
    { title: 'ユーザー', dataIndex: 'purchaserUser' },
    { title: 'プラン名', dataIndex: 'planTitle' },
    { title: '金額', dataIndex: 'planPrice' },
  ]

  const data = []

  // 自分のプランを購入してくれた人のデータを抽出する
  props.purchasersList.forEach((purchaser, index) => {
    const purchaserObj = {
      day: purchaser.createdAt,
      purchaserUser: purchaser.purchaserProfile.nickname,
      purchaserImage: purchaser.purchaserProfile.profileImage,
      planTitle: purchaser.contractPlan.title,
      planPrice: `${purchaser.contractPlan.price} 円`,
      key: index,
    }
    data.push(purchaserObj)
  })

  return (
    <>
      {/* <div style={{ marginBottom: 32 }}>売上履歴</div> */}

      <List
        // itemLayout="horizontal"
        // gridを入れることで、リストの中間にできる線を消すことができる
        grid={{
          xs: 1,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              style={{ border: 'solid 1px #eeeeee', borderRadius: 4, padding: 8 }}
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              avatar={<Avatar src={item.purchaserImage} />}
              // title={<a href="https://ant.design">{item.planTitle}</a>}
              title={
                <Link to={routes.top()}>
                  <Row type="flex" justify="space-between">
                    <Col>{item.planTitle}</Col>
                    <Col style={{ fontSize: 12 }}>{item.day}</Col>
                  </Row>
                </Link>
              }
              description={
                <>
                  <div>{`購入者:${item.purchaserUser}`}</div>
                  <div style={{ textAlign: 'end' }}>{`金額:${item.planPrice}`}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default DashboardSale
