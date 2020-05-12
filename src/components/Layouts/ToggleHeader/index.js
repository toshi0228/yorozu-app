import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { isToken } from '../../../store/actions/account'
import GuestHeader from './GuestHeader'
import MemberHeader from './MemberHeader'

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// tokenがあるかないかで、ログイン済みアカウン済みのヘッダーか判断
// tokenがあれば、ログイン済み
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const ToggleHeader = (props) => {
  useEffect(() => {
    console.log(props)
    console.log(props.isTokenEvent(props.token))
  })

  if (props.token) {
    return <MemberHeader />
  } else {
    return <GuestHeader />
  }
}

const mapStateToProps = (state) => ({ token: state.account.authToken })

const mapDispatchToProps = (dispatch) => ({
  isTokenEvent: (token) => dispatch(isToken(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleHeader)
