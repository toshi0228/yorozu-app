import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { signIn } from '../store/actions/account';
// import { Col, Row } from 'antd';

import '../styles/SignInPage.scss';

const SignInPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const formProps = { email, password };
    const response = await axios.post('http://localhost:8080/', formProps);
    console.log(response);

    let res = { ...response.data, isLoggedIn: true };
    localStorage.setItem('id', res.id);
    localStorage.setItem('token', res.token);

    props.singIn(formProps);
    setEmail('');
    setPassword('');
  };

  // const handleSubmit = async () => {
  //   try {
  //     let formData = { email, password };
  //     const response = await axios.post('http://localhost:8080/', formData);
  //     let res = { ...response.data, isLoggedIn: true };
  //     localStorage.setItem('id', res.id);
  //     localStorage.setItem('token', res.token);

  //     props.history.push('/create_plan');
  //     return;
  //   } catch {
  //     setErrorMessage('メールかパスワードが間違ってます');
  //     // dispatch(push('/signin'))
  //   }

  //   setEmail('');
  //   setPassword('');
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="sign-page-title">ログイン</h2>
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
          <input type="submit" value="送信" />
        </p>
      </div>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    singIn: formProps => dispatch(signIn(formProps))
  };
};

export default connect(null, mapDispatchToProps)(SignInPage);

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// import React, { useState, useEffect, useForm } from 'react';
// import { Col, Row, Form, Input, Button } from 'antd';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 }
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 }
// };

// const Demo = () => {
//   const onFinish = values => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
//       <Form.Item
//         label="Username"
//         name="username"
//         rules={[{ required: true, message: 'Please input your username!' }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           送信
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Demo;

// const SignInPage = () => {
//   const [userName, setUserNmae] = useState([]);

//   const handleSubmit = values => {
//     values.preventDefault();
//     console.log('Received values of form: ', values);
//   };

//   return (
//     <Row type="flex" justify="center">
//       <Col span={12}>
//         新しくサインページを作る
//         <Form
//           onSubmit={handleSubmit}
//           name="basic"
//           initialValues={{
//             remember: true
//           }}
//         >
//           <Form.Item>
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your Username!'
//               }
//             ]}
//           >
//             <Input placeholder="Username" />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="login-form-button"
//             >
//               送信
//             </Button>
//           </Form.Item>
//         </Form>
//       </Col>
//     </Row>
//   );
// };

// export default SignInPage;
