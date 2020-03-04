import React from 'react';
// import Headerr from './Headerr';
import GuestHeader from './GuestHeader';
import MemberHeader from './MemberHeader';
import Footer from './Footer';

export const withGuestLayout = Container => props => {
  return (
    <>
      <GuestHeader />
      <Container props={props} />
      <Footer />
    </>
  );
};

// export const withMemberLayout = Container => props => {
export const withMemberLayout = Container => () => {
  return (
    <>
      <MemberHeader />
      <Container />
      <Footer />
    </>
  );
};
