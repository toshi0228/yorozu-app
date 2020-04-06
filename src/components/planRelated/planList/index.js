import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import axios from 'axios';
import PlanCard from '../PlanCard';

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  const feachPlan = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/plan/');
    console.log(response.data[0]);
    // const response = await axios.get('http://localhost:8080/create_plan');
    setPlans(response.data);
    return;
  };

  useEffect(() => {
    feachPlan();
  }, []);

  return (
    <List
      grid={{ gutter: [32, 32], column: 3, xs: 1, sm: 2, md: 3 }}
      dataSource={plans}
      renderItem={item => (
        <List.Item>
          <PlanCard item={item} />
        </List.Item>
      )}
    />
  );
};

export default PlanList;

//   return (
//     <List
//       grid={{ gutter: [32, 32], column: 3, xs: 1, sm: 2, md: 3 }}
//       dataSource={plans}
//       renderItem={item => (
//         <List.Item>
//           <Plan
//             id={item.id}
//             title={item.title}
//             image={item.image}
//             price={item.price}
//             description={item.description}
//             tag1={item.tags[0]}
//             tag2={item.tags[1]}
//             tag3={item.tags[2]}
//             tag4={item.tags[3]}
//             tag5={item.tags[4]}
//             tag6={item.tags[5]}
//           />
//         </List.Item>
//       )}
//     />
//   );
// };
// export default PlanList;
