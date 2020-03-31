import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/account';
import { Button, Form, Input, Icon } from 'antd';

const SignInPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.singIn({ email, password });
    setEmail('');
    setPassword('');
  };

  const layout = {
    wrapperCol: {
      offset: 8,
      span: 8
    }
  };

  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 8
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>ログイン</h2>
      <p style={{ textAlign: 'center', marginTop: 40 }}>
        メールアドレスとパスワードを入力してください。
      </p>
      <p className="alert">{errorMessage}</p>

      <Form {...layout} onSubmit={onSubmit}>
        <Form.Item name="username" style={{ marginTop: 40 }}>
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="メールアドレス"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            placeholder="パスワード"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 40, width: '50%' }}
          >
            ログイン
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    singIn: formProps => dispatch(signIn(formProps))
  };
};

export default connect(null, mapDispatchToProps)(SignInPage);
