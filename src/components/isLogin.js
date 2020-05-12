import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const isLogIn = (ComposedComponent) => {
  // 以下の関数で"ComposedComponent"をAという
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

export default isLogIn
