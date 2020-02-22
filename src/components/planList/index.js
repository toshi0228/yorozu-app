import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import axios from 'axios';
import Plan from '../plan/index';
// import styles from './index.module.scss';

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  const feachPlan = async () => {
    const response = await axios.get('http://localhost:8080/create_plan');
    setPlans(response.data);
    return;
  };

  useEffect(() => {
    feachPlan();
  }, []);

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={plans}
      renderItem={item => (
        <List.Item>
          <Plan
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            description={item.description}
            tag1={item.tags[0]}
            tag2={item.tags[1]}
            tag3={item.tags[2]}
            tag4={item.tags[3]}
            tag5={item.tags[4]}
            tag6={item.tags[5]}
          />
        </List.Item>
      )}
    />
  );
};
export default PlanList;

//   <List
//     grid={{ gutter: 16, column: 4 }}
//     dataSource={data}
// renderItem={item => (
//   <List.Item>
//     <Card title={item.title}>Card content</Card>
//   </List.Item>
// )}
//   />,

// const planList = plans.map((plan, index) => {
//   return (
//     <Plan
//       grid={{ gutter: 16, column: 4 }}
//       dataSource={plans}
//       renderItem={item => (
//         <List.Item>
//           <Card
// id={item.id}
// title={item.title}
// image={item.image}
// price={item.price}
// description={item.description}
// tag1={item.tags[0]}
// tag2={item.tags[1]}
// tag3={item.tags[2]}
// tag4={item.tags[3]}
// tag5={item.tags[4]}
// tag6={item.tags[5]}
//             key={index}
//           >
//             Card content
//           </Card>
//         </List.Item>
//       )}
//     />
//   );
// });

// ('==========-');

// const planList = plans.map((plan, index) => {
//   return (
//     <Plan
//       id={plan.id}
//       title={plan.title}
//       image={plan.image}
//       price={plan.price}
//       description={plan.description}
//       tag1={plan.tags[0]}
//       tag2={plan.tags[1]}
//       tag3={plan.tags[2]}
//       tag4={plan.tags[3]}
//       tag5={plan.tags[4]}
//       tag6={plan.tags[5]}
//       key={index}
//     />
//   );
// });

// ('==========-');

// useEffect(() => {
//   feachPlan();
// }, []);

//   return <ul className="plan-list-containe">{planList}</ul>;
// };

// export default PlanList;

// import { List, Card } from 'antd';

// const data = [
//   {
//     title: 'Title 1',
//   },
//   {
//     title: 'Title 2',
//   },
//   {
//     title: 'Title 3',
//   },
//   {
//     title: 'Title 4',
//   },
// ];

// ReactDOM.render(
//   <List
//     grid={{ gutter: 16, column: 4 }}
//     dataSource={data}
//     renderItem={item => (
//       <List.Item>
//         <Card title={item.title}>Card content</Card>
//       </List.Item>
//     )}
//   />,
//   mountNode,
// );
