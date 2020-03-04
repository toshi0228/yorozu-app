import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { createRootReducer } from '../store';
// import { push } from 'connected-react-router'

import '../styles/SignUpPage.scss';

const SignInPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useReducer(createRootReducer, {});
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    try {
      let formData = { email, password };
      const response = await axios.post(
        'http://localhost:8080/sign_in',
        formData
      );

      let res = { ...response.data, isLoggedIn: true };
      dispatch({ type: 'LOGIN', res });

      localStorage.setItem('id', res.id);
      localStorage.setItem('token', res.token);

      props.history.push('/create_plan');
      return;
    } catch {
      setErrorMessage('メールかパスワードが間違ってます');
      // dispatch(push('/signin'))
    }

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <h2 className="sign-page-title">新規登録</h2>
      <div className="sign-in-page-wrap">
        <p className="alert">{errorMessage}</p>

        <p className="input-label mail-input">メールアドレス入力</p>
        <input
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />

        <p className="input-label">パスワード入力</p>
        <input
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />

        <p className="submit-btn">
          <input onClick={login} type="submit" value="送信" />
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
