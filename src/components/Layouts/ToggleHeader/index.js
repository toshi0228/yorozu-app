import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import GuestHeader from './GuestHeader'
import MemberHeader from './MemberHeader'
import { tokenVerify } from '../../../store/actions/account'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// tokenがあるかないかで、ログイン済みアカウン済みのヘッダーか判断
// tokenがあれば、ログイン済み
// tokenがあるが、古いトークンもあるので検証とリフレッシュを行う
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const ToggleHeader = (props) => {
  useEffect(() => {
    // トークンはあるが、ログイン状態がoffの場合、トークンの検証を行う
    // トークンがあったとしても、リロードした時は呼ばれる
    if (props.token && props.isLoggedIn === false) {
      props.tokenVerifyEvent(props.token)
    }
  }, [])

  if (props.token) {
    return <MemberHeader />
  } else {
    return <GuestHeader />
  }
}

const mapStateToProps = (state) => ({
  token: state.account.authToken,
  isLoggedIn: state.account.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
  tokenVerifyEvent: (token) => dispatch(tokenVerify(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleHeader)
