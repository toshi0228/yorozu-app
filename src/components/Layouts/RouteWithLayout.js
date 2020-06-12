import React from 'react'
import ToggleHeader from './ToggleHeader'
import Footer from './Footer'

// 以下のporpsは、profileListのカードを押した時に、どのカードを押したで必要
export const withLayout = (Container) => (props) => {
  return (
    <>
      <ToggleHeader />
      <Container params={props} />
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

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 2020 6 12  ()が二つの理由追加
// <Router path="/" component={App}> <Router path="/" component={App()}> こんな感じで展開されている
// また、描写されたコンポーネントには、porpsが自動で付与されている
// そして、このpropsの中には、match,params,historyなどページ遷移する時に必要なデータ等入っている
// コンポーネントがpropsを受け取れる為に、porpsを渡す
// <Route exact path={routes.top()} component={withLayout(ProfileListPage)()} />

// ()が2つということは、一度関数を実行したら関数が帰ってくるということだ。二つの引数で値が決まる時に()()に使うと覚えよう
// というかそもそも関数とは、入れた値によって出てくるものが変わるということだ、 つまり、()()が二つって入れたい値が二つあるということだ
// つまり,コンテナによって出てくる値を変えたいので、2回出てくる
// トッピングみたいなものかな
// コンポーネントが刺身だとしたら、醤油か塩どっちで食べるみたいなものか

// 別の書き方
// export const withLayout = (Container) => {
//   const withLayoutContainer = (props) => {
//     return (
//       <>
//         <ToggleHeader />
//         <Container params={props} />
//         <Footer />
//       </>
//     )
//   }
//   return withLayoutContainer
// }

// 普通のコンポーネント
//   const app = (props) => {
//     return (
//       <>
//         <div/>hello world<div />
//       </>
//     )
//   }

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
