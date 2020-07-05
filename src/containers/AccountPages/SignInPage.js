import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn, resetErrorMessage } from '../../store/actions/account'
import { Button, Form, Input, Icon } from 'antd'

const SignInPage = (props) => {
  console.log(props)

  // ページ遷移しても、エラーメッセージが残っている場合があるので最初に消す
  useEffect(() => {
    props.resetErrorMessage()
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    props.singIn({ email, password })
    setEmail('')
    setPassword('')
  }

  const layout = {
    wrapperCol: {
      offset: 8,
      span: 8,
    },
  }

  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 8,
    },
  }

  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: 70 }}>ログイン</h2>
      <p style={{ textAlign: 'center', marginTop: 40 }}>メールアドレスとパスワードを入力してください。</p>
      {props.isSignFailure && (
        <p style={{ textAlign: 'center', color: 'red', fontSize: 8 }}>メールアドレスまたは、パスワード間違いがあります</p>
      )}

      <Form {...layout} onSubmit={onSubmit}>
        <Form.Item name="username" style={{ marginTop: 40 }}>
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="パスワード"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          {/* <Button type="primary" htmlType="submit" style={{ marginTop: 40, width: '50%'}}> */}
          <Button type="primary" htmlType="submit" style={{ marginTop: 40, width: '50%', marginBottom: 30 }}>
            ログイン
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => ({
  isSignFailure: state.account.isSignInFailure,
})

const mapDispatchToProps = (dispatch) => ({
  singIn: (formProps) => dispatch(signIn(formProps)),
  // エラーメッセージを消す
  resetErrorMessage: () => dispatch(resetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)

// =====================================================================================
// funcA()()
// 非同期の場合、関数の実行後、関数が返ってくるので、関数を実行するためにもう一度()をつける
// =====================================================================================
