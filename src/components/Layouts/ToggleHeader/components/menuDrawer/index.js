import React from 'react'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'

// url
import routes from '../../../../../routes/index'

// ====================================================
// ハンバガーメニューを押した時に出てくるDrawer
// ====================================================

const MenuDrawer = ({ isDrawer, setIsDrawer }) => {
  // Drawerの削除ボタンを押した時の処理
  const onClose = () => {
    setIsDrawer(false)
  }
  return (
    <>
      <Drawer title="アカウント" width={'80%'} visible={isDrawer} onClose={onClose}>
        <Link to={routes.siginIn()}>
          <p>ログイン</p>
        </Link>
        <Link to={routes.signUp()}>
          <p>新規登録</p>
        </Link>
      </Drawer>
    </>
  )
}

export default MenuDrawer
