import React, { useState } from 'react';
import { Row, Col, Input, Tabs, Button } from 'antd';
import ImageForm from '../../components/formRelated/ImageForm';
import InputTag from '../../components/formRelated/tagForm';

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [profileImage, setProfileImage] = useState([]);
  const [tags, setTags] = useState([]);

  const register = () => {
    console.log('登録');
    // const planContent = {
    //   title,
    //   description,
    //   image,
    //   price,
    //   tags,
    // };
    // props.postPlanEvent(planContent);
  };

  return (
    <>
      {/* プロフィール画面 */}
      <Row type="flex" justify="center" style={{ marginBottom: 48 }}>
        <Col style={{ fontSize: 18 }}>万事屋の情報</Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={4} offset={3}>
          ニックネーム
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10} offset={3}>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Col>
      </Row>

      {/* プロフィール画像 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          プロフィール画像の登録
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={9} offset={3}>
          <ImageForm image={profileImage} setImage={setProfileImage} />
        </Col>
      </Row>

      {/* プロフィール説明 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18} offset={3}>
          プロフィール説明
        </Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={18} offset={3}>
          <Input.TextArea
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 6 }}
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
            登録
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MyPage;
