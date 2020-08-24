import React from 'react'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

// url
import routes from '../../../../../routes/index'

// action
import { signOut } from '../../../../../store/actions/account'

// ====================================================
// ハンバガーメニューを押した時に出てくるDrawer
// ====================================================

const MenuDrawer = ({ isDrawer, setIsDrawer }) => {
  const dispatch = useDispatch()

  // Drawerの削除ボタンを押した時の処理
  const onClose = () => {
    setIsDrawer(false)
  }

  // Drwarメニューのログアウトボタンを押した時のイベント
  const singOutEvent = () => {
    dispatch(signOut())
  }
  return (
    <>
      <Drawer title="アカウント" width={'80%'} visible={isDrawer} onClose={onClose}>
        <Link to={routes.myPage()}>
          <p>マイページ</p>
        </Link>
        <Link to={routes.messageList()}>
          <p>メッセージ</p>
        </Link>
        <Link to={routes.dashboard()}>
          <p>ダッシュボード</p>
        </Link>
        <Link to={routes.top()}>
          <div onClick={() => singOutEvent()}>ログアウト</div>
        </Link>
      </Drawer>
    </>
  )
}

export default MenuDrawer
