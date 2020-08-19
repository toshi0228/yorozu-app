import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signUp, resetErrorMessage } from '../../store/actions/account'
import { Button, Row, Col, Form, Input, Icon } from 'antd'

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

  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: 70 }}>新規登録</h2>
      <p style={{ textAlign: 'center', marginTop: 40 }}>メールアドレスとパスワードを入力してください。</p>
      {props.isSignUpFailure && (
        <p style={{ textAlign: 'center', color: 'red', fontSize: 8 }}>
          既に使われているメールアドレス、もしくは登録できない文字が含まれています
        </p>
      )}

      <Form onSubmit={onSubmit}>
        <Form.Item name="username" style={{ marginTop: 40 }}>
          {/* メールアドレスの入力 */}
          <Row type="flex" justify="center">
            <Col xs={18} lg={8}>
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="password">
          {/* パスワードの入力 */}
          <Row type="flex" justify="center">
            <Col xs={18} lg={8}>
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder="パスワード"
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          {/* ログインボタン */}
          <Row type="flex" justify="center">
            <Col xs={12} lg={4}>
              <Button type="primary" htmlType="submit" block={true} style={{ marginTop: 40, marginBottom: 30 }}>
                登録する
              </Button>
            </Col>
          </Row>
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
