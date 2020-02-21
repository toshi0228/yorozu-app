import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plan from '../plan/index';
import './index.scss';

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  const feachPlan = async () => {
    const response = await axios.get('http://localhost:8080/create_plan');
    setPlans(response.data);
    return;
  };

  const planList = plans.map((plan, index) => {
    return (
      <Plan
        id={plan.id}
        title={plan.title}
        image={plan.image}
        price={plan.price}
        description={plan.description}
        tag1={plan.tags[0]}
        tag2={plan.tags[1]}
        tag3={plan.tags[2]}
        tag4={plan.tags[3]}
        tag5={plan.tags[4]}
        tag6={plan.tags[5]}
        key={index}
      />
    );
  });

  useEffect(() => {
    feachPlan();
  }, []);

  return <ul className="plan-list-containe">{planList}</ul>;
};

export default PlanList;
