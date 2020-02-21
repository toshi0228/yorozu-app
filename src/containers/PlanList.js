import React from 'react';
import Plan from '../components/plan';
import '../styles/PlanList.scss';

const PlanList = () => {
  return (
    <div>
      <div className="title-description">どんなお仕事をお願いする...?</div>
      <Plan />
      <Plan />
      <Plan />
    </div>
  );
};

export default PlanList;
