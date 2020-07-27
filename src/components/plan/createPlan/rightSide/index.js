import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Input } from 'antd'

import { createPlan } from '../../../../store/actions/plan'
import { checkPlanItem } from '../../../../store/actions/plan'

import InputTag from '../../../form/tagForm/index'
import ImageForm from '../../../form/ImageForm/index'

import style from './index.module.scss'

// ====================================================================
// プラン登録画面の入力項目カード
// ====================================================================

// yorozuId, planDataは、CreatePlanPageから渡ってくる
const InputPlanItem = ({ yorozuId, planData, checkInputItemEvent, createPlanEvent, isToRegister }) => {
  console.log('InputPlanItemに来た')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState([])

  const plan = {
    title,
    description,
    image,
    price,
    tags,
    yorozuId: yorozuId,
  }

  const planItem = [title, description, image, price, tags]

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  // 登録ボタンを押した時のアクション
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  const register = () => {
    // props.planDataの初期値 => [] 中身がなければ新規登録の処理
    if (planData.length === 0) {
      console.log('新規登録')
      checkInputItemEvent(planItem)
    } else {
      console.log('更新処理')
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  // checkInputItemEventでクリアしたら, isToRegisterが
  // falseからtrueになるので、プラン登録を行う
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  if (isToRegister) {
    console.log('登録の準備完了 => 作成')
    createPlanEvent(plan)
  }

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

const mapStateToProps = (state) => ({
  // checkInputItemEventでクリアしたら,isToRegisterがfalseからtrueになる
  isToRegister: state.plan.isToRegister,
})

const mapDispatchToProps = (dispatch) => ({
  // プランの登録
  createPlanEvent: (planContent) => dispatch(createPlan(planContent)),
  // プランの入力項目に空白がないか確認
  checkInputItemEvent: (planItem) => dispatch(checkPlanItem(planItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InputPlanItem)
