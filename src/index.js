import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './styles/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

// import './index.css';
// import 'antd/dist/antd.css';

// import { Layout, Menu } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// ReactDOM.render(
//   <>
//     <Layout>
//       <Header>header</Header>

//       <Layout>
//         <Sider breakpoint="md" collapsible>
//           <Menu theme="dark" mode="inline">
//             <Menu.Item key="1">
//               <span>nav 1</span>
//             </Menu.Item>
//             <Menu.Item key="2">
//               <span>nav 2</span>
//             </Menu.Item>
//             <Menu.Item key="3">
//               <span>nav 3</span>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Content>Content</Content>
//       </Layout>

//       <Footer>Footer</Footer>
//     </Layout>
//   </>,
//   document.getElementById('root')
// );

// serviceWorker.unregister();
