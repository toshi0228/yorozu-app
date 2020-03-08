import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/account';
import { Button, Form, Input, Icon } from 'antd';

const SignUpPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.singUp({ email, password });
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
      <h2 style={{ textAlign: 'center' }}>新規登録</h2>
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
    singUp: formProps => dispatch(signUp(formProps))
  };
};

export default connect(null, mapDispatchToProps)(SignUpPage);

// import React, { useState, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import { createRootReducer } from '../store';
// // import { push } from 'connected-react-router'

// import style from '../styles/SignUpPage.module.scss';

// const SignInPage = props => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [state, dispatch] = useReducer(createRootReducer, {});
//   const [errorMessage, setErrorMessage] = useState('');

//   const login = async () => {
//     try {
//       let formData = { email, password };
//       const response = await axios.post(
//         'http://localhost:8080/sign_in',
//         formData
//       );

//       let res = { ...response.data, isLoggedIn: true };
//       dispatch({ type: 'LOGIN', res });

//       localStorage.setItem('id', res.id);
//       localStorage.setItem('token', res.token);

//       props.history.push('/create_plan');
//       return;
//     } catch {
//       setErrorMessage('メールかパスワードが間違ってます');
//       // dispatch(push('/signin'))
//     }

//     setEmail('');
//     setPassword('');
//   };

//   useEffect(() => {
//     console.log(state);
//   }, [state]);

//   return (
//     <div>
//       <h2 className={style.signPageTitle}>新規登録da</h2>
//       <div className={style.signInPageWrap}>
//         <p className="alert">{errorMessage}</p>

//         <p className="input-label mail-input">メールアドレス入力</p>
//         <input
//           type="text"
//           value={email}
//           onChange={e => {
//             setEmail(e.target.value);
//           }}
//         />

//         <p className="input-label">パスワード入力</p>
//         <input
//           value={password}
//           onChange={e => {
//             setPassword(e.target.value);
//           }}
//         />

//         <p className="submit-btn">
//           <input onClick={login} type="submit" value="送信" />
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
