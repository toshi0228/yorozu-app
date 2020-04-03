import React from 'react';
import { Redirect } from 'react-router-dom';

const Auth = props => {
  const token = localStorage.getItem('token');
  return token === '123' ? props.children : <Redirect to={'/sign_in'} />;
};

export default Auth;
