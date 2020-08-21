import React from 'react'

import DetailPlanSection from '../../../plan/detailPlanSection/index'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// よろず、profileの詳細ページ
// 引数 dataには、profileのオブジェクトが入っている
// 24分割で, 左空白3、左サイド12,右サイド6 右空白3
// Rowの最大24で、その中でcolを決める
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const LeftSide = ({ data }) => {
  // プランリストを返す
  const planList = data.profileDetail.planList.map((planData, index) => {
    return <DetailPlanSection key={index} planData={planData} />
  })

  return <>{planList}</>
}

export default LeftSide
