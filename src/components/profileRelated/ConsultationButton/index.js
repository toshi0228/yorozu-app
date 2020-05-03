import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, message } from 'antd';
import { sendMessage } from '../../../store/actions/message';

// ====================================================================
// 相談ボタンとクリックした時に起動するモーダル
// ====================================================================

const ConsultationButton = (props) => {
  console.log(props);
  const [isVisible, setIsVisible] = useState(false);
  const [modalInputText, setModalInputText] = useState('');
  const showModal = () => {
    setIsVisible(true);
  };

  const hundleSubmit = () => {
    setIsVisible(false);
    props.sendMessageEvent(modalInputText);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <Button onClick={showModal}>相談をする</Button>
      <Modal
        title="やよずさんにメッセージで相談をする"
        visible={isVisible}
        onOk={hundleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={hundleSubmit}>
            送信
          </Button>,
        ]}
      >
        <p style={{ marginBottom: 20 }}>
          気になったら、まずは教えてほしいことを相談！
          <br />
          希望にあうマッチングをするために、よろずには現在の状況、
          <br />
          困っていること、 目標など、できるだけ詳しく送りましょう。
        </p>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 12 }}
          placeholder="もう少し具体的にどんなことをするか教えてください！"
          onChange={(e) => setModalInputText(e.target.value)}
        />
        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.profile,
});

const mapStateToDispatch = (dipatch) => ({
  sendMessageEvent: (message) => dipatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapStateToDispatch)(ConsultationButton);
