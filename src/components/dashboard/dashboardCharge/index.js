import React from 'react'
import { Row, Col, Table } from 'antd'

// const columns

// todo 課金のところから
const dashboardCharge = (props) => {
  console.log('dashboardCharge')
  console.log(props.contractPlanlist)

  const columns = [
    { title: '日にち', dataIndex: 'day' },
    { title: 'ユーザー', dataIndex: 'user' },
    { title: 'プラン名', dataIndex: 'planTitle' },
    { title: '金額', dataIndex: 'planPrice' },
  ]

  const data = []

  // 送信者のメッセージルームに合わせて,メッセージ内容を変える
  props.contractPlanlist.forEach((contractPlan, index) => {
    const contractPlanObj = {
      day: contractPlan.createdAt,
      user: contractPlan.contractYorozuyaProfile,
      planTitle: contractPlan.contractPlan.title,
      planPrice: `${contractPlan.contractPlan.price} 円`,
      key: index,
    }
    data.push(contractPlanObj)
  })

  return (
    <>
      <div style={{ marginBottom: 32 }}>支払履歴</div>
      <Table columns={columns} dataSource={data}></Table>
    </>
  )
}

export default dashboardCharge
