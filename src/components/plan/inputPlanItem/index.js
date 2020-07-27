import React, { useState } from 'react'
import { Button, Col, Row, Input } from 'antd'

import InputTag from '../../../components/form/tagForm/index'
import ImageForm from '../../../components/form/ImageForm/index'

import style from './index.module.scss'

// ====================================================================
// プラン登録画面の入力項目カード
// ====================================================================

const InputPlanItem = ({ register, yorozuId }) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState([])

  const toggleRegisterBtn = () => {
    if (yorozuId) {
      // よろずIDがあれば、作成できる(プロフィールを作成済みの場合)
      return (
        <>
          <Button type="primary" htmlType="submit" size="large" style={{ width: 200 }} onClick={register}>
            登録
          </Button>
        </>
      )
    } else {
      // よろずIDがなければ、作成できない(プロフィールを作成をしていない場合)
      return (
        <>
          <Button type="primary" htmlType="submit" size="large" style={{ width: 200 }} onClick={register} disabled>
            プロフィールから作成をお願いします
          </Button>
        </>
      )
    }
  }

  return (
    <>
      <Row type="flex" justify="center" style={{ marginTop: 16, marginBottom: 32 }}>
        <Col>
          <h3>プランの新規登録</h3>
        </Col>
      </Row>

      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>タイトル</h3>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="サプライズプラン、モーニングコールプラン...etc"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      {/* 画像登録 */}
      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>イメージ画像の登録</h3>
          <ImageForm image={image} setImage={setImage} />
        </Col>
      </Row>

      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>プラン説明</h3>
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} autoSize={{ minRows: 6, maxRows: 6 }} />
        </Col>
      </Row>

      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>料金</h3>
        </Col>
        <Col span={16}>
          <Input prefix="￥" suffix="円" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 64 }}>
        <Col>
          <h3 className={style.title}>タグ</h3>
        </Col>
        <Col>
          <InputTag setTags={setTags} />
        </Col>
      </Row>

      {/* 送信ボタン */}
      <Row type="flex" justify="center" style={{ marginBottom: 48 }}>
        <Col>{toggleRegisterBtn()}</Col>
      </Row>
    </>
  )
}

export default InputPlanItem
