import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/account';
import { Link } from 'react-router-dom';

import '../styles/Header.scss';
import '../styles/SignInPage.scss';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      hasEmailError: '',
      password: '',
      hasPasswordError: ''
    };
  }

  handleEmailChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      email: inputValue,
      hasEmailError: isEmpty
    });
  }

  handlePasswordChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      password: inputValue,
      hasPasswordError: isEmpty
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    // 送信したら,inputを空にする
    this.setState({
      email: '',
      password: ''
    });

    let acountInfo = {
      inputEmail: this.state.email,
      inputPassword: this.state.password
    };

    this.props.signIn(acountInfo);
  };

  render() {
    let emailErrorText;
    if (this.state.hasEmailError) {
      emailErrorText = (
        <p className="alert">※メールアドレスを入力してください</p>
      );
    }

    let passwordErrorText;
    if (this.state.hasPasswordError) {
      passwordErrorText = (
        <p className="alert">※パスワードを入力してください</p>
      );
    }

    let contactForm = (
      <form onSubmit={this.handleSubmit}>
        <p className="input-label">メールアドレス入力</p>
        <input
          value={this.state.email}
          onChange={event => {
            this.handleEmailChange(event);
          }}
        />
        {emailErrorText}

        <p className="input-label">パスワード入力</p>
        <input
          value={this.state.password}
          onChange={event => {
            this.handlePasswordChange(event);
          }}
        />

        {passwordErrorText}

        <p className="submit-btn">
          <input type="submit" value="送信" />
        </p>
      </form>
    );

    return (
      <div>
        <div className="header-wrap">
          <h2 className="plan-list">ログインページ</h2>
          <div className="rogin-btn">
            <Link to="/">
              <div
                onClick={user => {
                  signIn(user);
                }}
              >
                ホーム{' '}
              </div>
            </Link>
          </div>
        </div>
        <hr className="header-borde-line" />

        <div className="sign-in-page-wrap">
          <h2>サインイン</h2>
          <div>{contactForm}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ accountReducer }) => {
  return {
    account: accountReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: acountInfo => dispatch(signIn(acountInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
