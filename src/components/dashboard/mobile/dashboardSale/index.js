import React from 'react'
import { Table } from 'antd'

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
      purchaserUser: purchaser.purchaserUserName,
      planTitle: purchaser.contractPlan.title,
      planPrice: `${purchaser.contractPlan.price} 円`,
      key: index,
    }
    data.push(purchaserObj)
  })

  return (
    <>
      {/* <div style={{ marginBottom: 32 }}>売上履歴</div> */}
      <Table columns={columns} dataSource={data}></Table>
    </>
  )
}

export default DashboardSale
