import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const StartPage = () => {
  return (
    <div>
      <Layout>
        <Sider>Sider</Sider>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default StartPage;
