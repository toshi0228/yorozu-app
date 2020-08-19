import React from 'react'
import { Drawer } from 'antd'
import SearchForm from '../../../../form/searchForm'

// ====================================================
// 検索のアイコンを押した時に出てくるDrawer
// ====================================================

const SearchDrawer = ({ isDrawer, setIsDrawer }) => {
  // Drawerの削除ボタンを押した時の処理
  const onClose = () => {
    setIsDrawer(false)
  }
  return (
    <Drawer
      title="よろずやを探す"
      // height={'30%'}
      visible={isDrawer}
      onClose={onClose}
      placement={'top'}
      bodyStyle={{ height: 0 }}
    >
      <div style={{ marginTop: 50 }}>
        <SearchForm />
      </div>
    </Drawer>
  )
}

export default SearchDrawer
