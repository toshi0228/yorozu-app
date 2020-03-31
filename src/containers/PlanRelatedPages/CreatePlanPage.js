import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Upload, Input, Row, Col, Icon, Button } from 'antd';
import InputTag from '../../components/InputTag';
import axios from 'axios';
import { cratePlan } from '../../store/actions/plan';

const { TextArea } = Input;
const { Dragger } = Upload;

const CreatePlanPage = props => {
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
      tags
    };
    axios.post('http://localhost:8080/create_plan', planContent);
    props.createPlan(planContent);
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
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          イメージ画像の登録
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={9} offset={3}>
          <Dragger value={image} onChange={e => setImage(e.file.name)}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text" style={{ fontSize: 12 }}>
              クリックまたは、ドラックで
              <br />
              画像を保存してください
            </p>
          </Dragger>
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
            onChange={e => setDescription(e.target.value)}
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
            onChange={e => setPrice(e.target.value)}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          タグ
        </Col>
      </Row>

      <InputTag tags={tags} setTags={setTags} />

      <Row type="flex" justify="center">
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ background: '#2AB3A2', width: 200 }}
            onClick={register}
          >
            送信
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  return {
    plan: state.plan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPlan: planContent => {
      return dispatch(cratePlan(planContent));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanPage);
