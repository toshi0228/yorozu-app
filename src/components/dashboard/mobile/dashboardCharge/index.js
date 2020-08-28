import React from 'react'
import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes/index'
// const columns

// todo 課金のところから
const dashboardCharge = (props) => {
  console.log('DashboardSale')
  console.log(props)

  const data = []

  // 自分がプランを購入した万屋情報
  props.contractPlanlist.forEach((contractPlan, index) => {
    // よろずやのIDでプランページのパスでもある
    const contractPlanObj = {
      day: contractPlan.createdAt,
      yorozuya: contractPlan.contractYorozuyaProfile.nickname,
      yorozuyaImage: contractPlan.contractYorozuyaProfile.profileImage,
      yorozuyaId: contractPlan.receiverYorozuId,
      planTitle: contractPlan.contractPlan.title,
      planPrice: `${contractPlan.contractPlan.price} 円`,
      key: index,
    }
    data.push(contractPlanObj)
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
                <Link to={routes.profileDetail(item.yorozuyaId)}>
                  <Avatar src={item.yorozuyaImage} />
                </Link>
              }
              title={item.yorozuya}
              description={
                <>
                  <div>{`プラン：${item.planTitle}`}</div>
                  <div>{`契約日：${item.day}`}</div>
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

export default dashboardCharge
