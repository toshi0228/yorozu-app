import React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes/index'
// const columns

// todo 課金のところから
const dashboardCharge = (props) => {
  const columns = [
    { title: '日にち', dataIndex: 'day' },
    { title: 'よろず屋', dataIndex: 'yorozuya' },
    { title: 'プラン名', dataIndex: 'planTitle' },
    { title: '金額', dataIndex: 'planPrice' },
  ]

  const data = []

  // 送信者のメッセージルームに合わせて,メッセージ内容を変える
  props.contractPlanlist.forEach((contractPlan, index) => {
    // よろずやのIDでプランページのパスでもある
    const yorozuyaId = contractPlan.receiverYorozuId
    const contractPlanObj = {
      day: contractPlan.createdAt,
      yorozuya: <Link to={routes.profileDetail(yorozuyaId)}>{contractPlan.contractYorozuyaProfile.nickname}</Link>,
      yorozuyaImage: contractPlan.contractYorozuyaProfile.profileImage,
      planTitle: contractPlan.contractPlan.title,
      planPrice: `${contractPlan.contractPlan.price} 円`,
      key: index,
    }
    data.push(contractPlanObj)
  })

  return (
    <>
      {/* <div style={{ marginBottom: 32 }}>支払履歴か</div> */}
      <Table columns={columns} dataSource={data}></Table>
    </>
  )
}

export default dashboardCharge
