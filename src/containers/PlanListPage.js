import React from 'react';

import Header from './Header';
import PlanList from '../components/planList/index';
import Footer from './Footer';

const PlanListPage = () => {
  return (
    <div>
      <Header />
      <PlanList />
      <Footer />
    </div>
  );
};

export default PlanListPage;
