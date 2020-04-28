import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Upload, Input, Row, Col, Button } from 'antd';
import InputTag from '../../components/formRelated/tagForm';
import { postPlanEvent } from '../../store/actions/plan';
import ImageForm from '../../components/formRelated/ImageForm';

const { TextArea } = Input;

const CreatePlanPage = (props) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);

  const register = () => {
    const planContent = {
      title,
      description,
      image,
      price,
      tags,
    };
    props.postPlanEvent(planContent);
  };

  return (
    <>
      <div>{props.title}</div>

      <Row style={{ marginBottom: 32 }}>
        <Col span={8} offset={3}>
          <h2>プラン作成画面</h2>
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={4} offset={3}>
          タイトル
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10} offset={3}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          イメージ画像の登録
        </Col>
      </Row>

      {/* 画像登録 */}
      <Row style={{ marginBottom: 48 }}>
        <Col span={9} offset={3}>
          <ImageForm image={image} setImage={setImage} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          プラン説明
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={18} offset={3}>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 6 }}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          料金
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={7} offset={3}>
          <Input
            prefix="￥"
            suffix="円"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          タグ
        </Col>
      </Row>

      {/* タグ入力 */}
      <InputTag setTags={setTags} />

      {/* 送信ボタン */}
      <Row type="flex" justify="center">
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: 200 }}
            onClick={register}
          >
            送信
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postPlanEvent: (planContent) => dispatch(postPlanEvent(planContent)),
});

// const mapDispatchToProps = dispatch => {
//   return {
//     postPlanEvent: planContent => {
//       return dispatch(postPlanEvent(planContent));
//     }
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanPage);
