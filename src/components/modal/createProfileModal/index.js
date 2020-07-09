import React from 'react'

import { Modal } from 'antd'

const CreateProfileModal = ({ modalText, error, setModal }) => {
  const toggleModal = () => {
    // エラーがあった場合のモーダル
    if (error) {
      Modal.error({
        title: modalText,
        onOk() {},
      })
      // もう一度ボタンを押した時に、モーダルが表示できるようにする
      setModal(false)
    } else {
      Modal.success({
        title: modalText,
        onOk() {},
      })
      setModal(false)
    }
  }

  return <div>{toggleModal()}</div>
}

export default CreateProfileModal
