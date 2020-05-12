import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const RequireAuth = (ComposedComponent) => {
  // 以下の関数で"ComposedComponent"をAUTHという
  // 箱(関数)の中に入れてトークンがあるか確認する
  // returnでチェック済みのComposedComponentが返ってくる
  function Auth(props) {
    const shouldNavigateAway = () => {
      if (props.authTokenExist) {
        console.log('isRequireAuth:tokenあり')
      } else {
        // tokenがなければ、ログインページに飛ぶ
        props.push('sign_in')
        console.log('tokenなし')
      }
    }

    useEffect(() => {
      shouldNavigateAway()
    })
    return <ComposedComponent />
  }

  const mapStateToProps = ({ account }) => ({
    isLoggedIn: account.isLoggedIn,
    authTokenExist: account.authToken,
  })

  const mapDispatchToProps = (dispatch) => {
    return { push: (path) => dispatch(push(path)) }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default RequireAuth

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// どんな動きをするか整理
// まずコンポーネントが引数のRequireAuth関数が呼び出される
// (1)RequireAuth(component)
//    RequireAuth関数が呼び出されたら、(2)がリターンされる
// (2)return connect(mapStateToProps, mapDispatchToProps)(Auth)
//    これは、storeからデータをとってきて、それを(Auth)コンポーネントにpropsとして流し込む
// (3)次にstoreデータを連結させた、Auth関数をみる
// Auth関数はtokenがあるかどうかを判断する関数を返す

// Pointe
// 関数を左回りの回転をイメージしてくる。
// 左回転で中心に向かうようにプログラムを組んで行くとうまくいく
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
