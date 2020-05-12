import React from 'react'
// import Headerr from './Headerr';
import ToggleHeader from './ToggleHeader'
import GuestHeader from './GuestHeader'
import MemberHeader from './MemberHeader'
import Footer from './Footer'

// 以下のporpsは、profileListのカードを押した時に、どのカードを押したで必要
export const withGuestLayout = (Container) => (props) => {
  return (
    <>
      {/* <GuestHeader /> */}
      <ToggleHeader />
      <Container params={props} />
      <Footer />
    </>
  )
}

export const withMemberLayout = (Container) => () => {
  return (
    <>
      <MemberHeader />
      <Container />
      <Footer />
    </>
  )
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ()が二つの理由
// <Router path="/" component={App}>  通常
// <Route exact path="/" component={withMemberLayout(requireAuth(ProfileListPage))} />

// 大切なことは、APP側のcomponetの中は、一回関数を実行したらコンポーネントが展開される形にしないといけない
// だから、{withMemberLayout(requireAuth(ProfileListPage))}では、一回関数を実行しただけでは、関数が帰って
// くる形になってしまうので、2回文関数を実行しないといけない
// const withGuestLayout = (Container) => (props)
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
