import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import FormButton from '../../formRelated/FormButton';

const PlanRequestModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        リクエストを送る
      </Button>
      {/* <FormButton /> */}
      <Modal
        title="リクエストの相談"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={handleOk}>
            送信
          </Button>,
        ]}
      >
        <p style={{ marginBottom: 20 }}>
          よろず屋が承認すると契約できるようになります。
          <br />
          相談内容を記入した上でよろず屋と契約が可能かどうか確認しましょう。
        </p>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 12 }}
          placeholder="契約を考えているので、承認をお願いいたします"
        />
        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </div>
  );
};

export default PlanRequestModal;
