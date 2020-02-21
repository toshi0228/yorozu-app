import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DetailPlan from '../components/detailPlan';

const PlanDetailPage = props => {
  const { id } = props.match.params;
  return (
    <div>
      <Header />
      <DetailPlan id={id} />
      <Footer />
    </div>
  );
};

export default PlanDetailPage;
