import React from 'react';
import { List } from 'antd';
import ProfileCard from '../ProfileCard';

// propsからは、プランのリストデータを受け取る
const ProfileList = (props) => {
  return (
    <List
      grid={{ gutter: [32, 32], column: 3, xs: 1, sm: 2, md: 3 }}
      dataSource={props.profileListData}
      renderItem={(item) => (
        <List.Item>
          <ProfileCard planData={item} />
        </List.Item>
      )}
    />
  );
};

export default ProfileList;
