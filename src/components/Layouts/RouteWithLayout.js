import React from 'react'
// import Headerr from './Headerr';
import GuestHeader from './GuestHeader'
import MemberHeader from './MemberHeader'
import Footer from './Footer'

// 以下のporpsは、profileListのカードを押した時に、どのカードを押したで必要
export const withGuestLayout = (Container) => (props) => {
  return (
    <>
      <GuestHeader />
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

// export const LoggedComponent = (Container) => {
//   function IsLogin(props) {
//     return (
//       <>
//         <GuestHeader />
//         <Container params={props} />
//         <Footer />
//       </>
//     )
//   }

//   return (map)(sLogin)
// }

// const isLogIn = (ComposedComponent) => {
//   // 以下の関数で"ComposedComponent"をAという
//   // 箱(関数)の中に入れてトークンがあるか確認する
//   // returnでチェック済みのComposedComponentが返ってくる
//   function Auth(props) {
//     const shouldNavigateAway = () => {
//       if (props.authTokenExist) {
//         console.log('isRequireAuth:tokenあり')
//       } else {
//         // tokenがなければ、ログインページに飛ぶ
//         props.push('sign_in')
//         console.log('tokenなし')
//       }
//     }

//     useEffect(() => {
//       shouldNavigateAway()
//     })
//     return <ComposedComponent />
//   }

//   const mapStateToProps = ({ account }) => ({
//     isLoggedIn: account.isLoggedIn,
//     authTokenExist: account.authToken,
//   })

//   const mapDispatchToProps = (dispatch) => {
//     return { push: (path) => dispatch(push(path)) }
//   }

//   return connect(mapStateToProps, mapDispatchToProps)(Auth)
// }

// export default isLogIn

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ()が二つの理由
// <Router path="/" component={App}>  通常
// <Route exact path="/" component={withMemberLayout(requireAuth(ProfileListPage))} />

// 大切なことは、APP側のcomponetの中は、一回関数を実行したらコンポーネントが展開される形にしないといけない
// だから、{withMemberLayout(requireAuth(ProfileListPage))}では、一回関数を実行しただけでは、関数が帰って
// くる形になってしまうので、2回文関数を実行しないといけない
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// const withGuestLayout = (Container) => (props)
