import React from 'react'
import _ from 'lodash'

import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../routes'

// =============================================================
// モバイル用のプランリスト
// propsからは、プランのリストデータを受け取る
// =============================================================

const ProfileList = ({ data }) => {
  const listData = []

  data.profileList.forEach((profile) => {
    listData.push({
      avatar: profile.profileImage,
      yorozuyaThumbnailImage: profile.yorozuyaThumbnailImage,
      yorozuyaName: profile.yorozuyaName,
      description: profile.profileDescription,
      yorozuId: profile.yorozuId,
    })
  })

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <Link to={`${routes.profileDetail(item.yorozuId)}`}>
              <img width={'100%'} height={200} alt="logo" src={item.yorozuyaThumbnailImage} />
            </Link>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.yorozuyaName}
            description={item.description}
            style={{ height: 120, overflow: 'hidden' }}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

export default ProfileList
