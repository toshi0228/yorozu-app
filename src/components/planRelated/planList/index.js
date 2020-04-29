import React from 'react';
import { List } from 'antd';
import PlanCard from '../PlanCard';

// propsからは、プランのリストデータを受け取る
const PlanList = (props) => {
  return (
    <List
      grid={{ gutter: [32, 32], column: 3, xs: 1, sm: 2, md: 3 }}
      dataSource={props.planListdata}
      renderItem={(item) => (
        <List.Item>
          <PlanCard planData={item} />
        </List.Item>
      )}
    />
  );
};

export default PlanList;
