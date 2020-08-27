import React from 'react'
import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes'

// ================================================================
// 売り上げのダッシュボード
// ================================================================

const DashboardSale = (props) => {
  const data = []

  // 自分のプランを購入してくれた人のデータを抽出する
  props.purchasersList.forEach((purchaser, index) => {
    const purchaserObj = {
      day: purchaser.createdAt,
      purchaserUser: purchaser.purchaserProfile.nickname,
      purchaserImage: purchaser.purchaserProfile.profileImage,
      purchaserYorozuId: purchaser.senderYorozuId,
      planTitle: purchaser.contractPlan.title,
      planPrice: `${purchaser.contractPlan.price} 円`,
      key: index,
    }
    data.push(purchaserObj)
  })

  return (
    <>
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
              avatar={
                <Link to={routes.profileDetail(item.purchaserYorozuId)}>
                  <Avatar src={item.purchaserImage} />
                </Link>
              }
              title={item.planTitle}
              description={
                <>
                  <div>{`購入者：${item.purchaserUser}`}</div>
                  <div>{`日時：${item.day}`}</div>
                  <h4 style={{ textAlign: 'end', color: '#000000A6' }}>{`金額：${item.planPrice}`}</h4>
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
