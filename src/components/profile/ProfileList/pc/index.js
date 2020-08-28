import React from 'react'
import { List } from 'antd'
import ProfileCard from '../../ProfileCard'
import _ from 'lodash'

// propsからは、プランのリストデータを受け取る
const ProfileList = ({ data }) => {
  return (
    <List
      // grid={{ gutter: [32, 32], column: 3, xs: 1, sm: 2, md: 2, lg: 3 }}
      grid={{ gutter: [32, 32], column: 3, xs: 1, sm: 2, md: 2, lg: 3 }}
      dataSource={data.profileList}
      renderItem={(item) => (
        <List.Item>
          <ProfileCard data={item} />
        </List.Item>
      )}
    />
  )
}

export default ProfileList
