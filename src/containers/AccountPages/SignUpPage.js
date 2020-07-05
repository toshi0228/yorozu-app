import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signUp, resetErrorMessage } from '../../store/actions/account'
import { Button, Form, Input, Icon } from 'antd'

const SignUpPage = (props) => {
  useEffect(() => {
    props.resetErrorMessage()
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    props.singUp({ email, password })
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
      <h2 style={{ textAlign: 'center', marginTop: 70 }}>新規登録</h2>
      <p style={{ textAlign: 'center', marginTop: 40 }}>メールアドレスとパスワードを入力してください。</p>
      {props.isSignUpFailure && (
        <p style={{ textAlign: 'center', color: 'red', fontSize: 8 }}>
          既に使われているメールアドレスか、または登録できない文字が含まれています
        </p>
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
          <Button type="primary" htmlType="submit" style={{ marginTop: 40, width: '50%', marginBottom: 30 }}>
            ログイン
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => ({
  isSignUpFailure: state.account.isSignUpFailure,
})

const mapDispatchToProps = (dispatch) => ({
  singUp: (formProps) => dispatch(signUp(formProps)),
  // エラーメッセージを消す
  resetErrorMessage: () => dispatch(resetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
