import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Upload, Input, Row, Col, Icon, Button } from 'antd';
import InputTag from '../../components/formRelated/tagForm';
import { postPlanEvent } from '../../store/actions/plan';
import ImageForm from '../../components/formRelated/ImageForm';

const { TextArea } = Input;
const { Dragger } = Upload;

const CreatePlanPage = (props) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);

  const fileData = {
    name: 'image',
    multiple: true,
    onChange: (file) => {
      onDrop(file);
    },
  };

  const onDrop = (e) => {
    console.log('fileのアップロード');
    console.log(e);
    loadImage(e.file);
  };

  // const loadImage = file => {
  //   setTimeout(() => {
  //     console.log('読み込み完了');
  //     console.log(file);
  //     setImage(file);
  //   )},2000);
  // };

  const loadImage = (file) => {
    setImage(file);
    setTimeout(() => {
      console.log(image);
    }, 2000);
  };

  // const aaa = setImage => {
  //   console.log('aaafunc');
  //   console.log(image);
  // };

  // () => console.log(image)

  // const fileData = {
  //   name: 'image',
  //   multiple: true,
  //   action: 'http://127.0.0.1:8000/api/plan/',
  //   headers: {
  //     'content-type': 'multipart/form-data'
  //   }
  // };

  // action: 'http://127.0.0.1:8000/api/plan/entry',

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

      {/* <Row style={{ marginBottom: 48 }}>
        <Col span={9} offset={3}>
          <input type="file" name="file" onChange={e => hundleImage(e)} />
        </Col>
      </Row> */}

      <Row style={{ marginBottom: 48 }}>
        <Col span={9} offset={3}>
          <ImageForm image={image} setImage={setImage} />
        </Col>
      </Row>

      {/* <Row style={{ marginBottom: 48 }}>
        <Col span={9} offset={3}> */}
      {/* <Dragger value={image} onChange={e => setImage(e.file.name)}> */}
      {/* <Dragger {...fileData}>
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
      </Row> */}

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

// const hundleImage = e => {
//   console.log(e.target.files[0]);
//   const file = e.target.files[0];
//   console.log(file);
//   const reader = new FileReader();
//   // reader.readAsDataURL(file);
//   // const reader = new FileReader();
//   reader.onload = e => {
//     console.log('読み込まれた');
//     const ToBase64image = e.target.result;
//     setImage(ToBase64image);
//   };
//   // console.log(image);
//   // console.log(reader.readAsDataURL(file));
//   // reader.readAsDataURL(file);
//   // const url = reader.readAsDataURL(file);
//   // console.log(image);
//   // console.log(url);
//   // setImage(url);
//   // console.log(reader.result);
//   console.log('画像の変更');
// };
