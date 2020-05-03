import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, message } from 'antd';
import { planRequest } from '../../../store/actions/plan';

// ====================================================================
// プランリクエストのモーダル
// ====================================================================

const PlanRequestModal = (props) => {
  console.log(props);
  const [isVisible, setIsVisible] = useState(false);
  const [modalInputText, setModalInputText] = useState('');
  const showModal = () => {
    setIsVisible(true);
  };

  const hundleSubmit = () => {
    setIsVisible(false);
    props.planRequestEvent(modalInputText);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        リクエストを送る
      </Button>
      <Modal
        title="リクエストの相談"
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
          よろず屋が承認すると契約できるようになります。
          <br />
          相談内容を記入した上でよろず屋と契約が可能かどうか確認しましょう。
        </p>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 12 }}
          placeholder="契約を考えているので、承認をお願いいたします"
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
  planRequestEvent: (requestMessage) => dipatch(planRequest(requestMessage)),
});

export default connect(mapStateToProps, mapStateToDispatch)(PlanRequestModal);
