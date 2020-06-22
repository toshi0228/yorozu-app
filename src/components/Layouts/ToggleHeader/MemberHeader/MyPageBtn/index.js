import React from 'react'
import { Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../../../../../routes'

import styles from './index.module.scss'

const MyPageBtn = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={routes.myPage()}>マイページ</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={routes.messageList()}>メッセージ</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={routes.dashboard()}>ダッシュボード</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={routes.top()}>
          <div onClick={() => props.singOutEvent()}>ログアウト</div>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.btn}>マイページ</div>
      </Dropdown>
    </>
  )
}

export default MyPageBtn
