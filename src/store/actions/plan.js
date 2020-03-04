import { CREATE_PLAN } from '../actionTypes';

export const cratePlan = planContent => {
  return {
    type: CREATE_PLAN,
    payload: planContent
  };
};
