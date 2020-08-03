import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Input } from 'antd'

import { createPlan, updatePlan } from '../../../../store/actions/plan'
import { checkPlanItem } from '../../../../store/actions/plan'

import InputTag from '../../../form/tagForm/index'
import ImageForm from '../../../form/ImageForm/index'

import style from './index.module.scss'

// ====================================================================
// プラン登録画面の入力項目カード
// ====================================================================

// yorozuId,  registeredPlanは、CreatePlanPageから渡ってくる
const InputPlanItem = ({
  yorozuId,
  checkInputItemEvent,
  createPlanEvent,
  isToRegister,
  isNewCreatePlan,
  registeredPlan,
  updatePlanEvent,
}) => {
  // const [title, setTitle] = useState(registeredPlan['title'])
  const [title, setTitle] = useState('')
  const [image, setImage] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState([])

  const plan = {
    id: registeredPlan['id'],
    title,
    description,
    image,
    price,
    tags,
    yorozuId: yorozuId,
  }

  const planItem = [title, description, image, price, tags]

  // ======================================================================
  // 登録ボタンを押した時のアクション
  // ======================================================================

  const register = () => {
    // 新規登録の場合は、isNewCreatePlanがtrueになる
    if (isNewCreatePlan) {
      checkInputItemEvent(planItem)
      // 更新処理
    } else {
      // 更新の場合は, checkInputItemEventで空白の確認を行わない
      updatePlanEvent(plan)
    }
  }

  // ======================================================================
  // checkInputItemEventでクリアしたら, isToRegisterが
  // falseからtrueになるので、プラン登録を行う
  // ======================================================================

  if (isToRegister) {
    console.log('登録の準備完了 => 作成')
    createPlanEvent(plan)
  }

  // ======================================================================
  // 左側のプランが押されたら、登録してあるプラン情報を表示させる
  // ======================================================================
  useEffect(() => {
    setTitle(registeredPlan['title'])
    setDescription(registeredPlan['description'])
    setPrice(registeredPlan['price'])
    // setTags(registeredPlan['tags'])
    // 画像登録する場所は、プランが押されたごとに履歴を消す なぜなら、以前登録したプランの画像で上書きして
    // しまうので、プランが変更をしたらリセットを行う
    setImage([])
  }, [registeredPlan])

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
          <Button type="primary" htmlType="submit" size="large" style={{ width: 400 }} onClick={register} disabled>
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
          <h3>プランの登録</h3>
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
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 6 }}
            placeholder="どんなプランなのか書いて見ましょう"
          />
        </Col>
      </Row>

      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>料金</h3>
        </Col>
        <Col span={16}>
          <Input prefix="￥" suffix="円" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="12000" />
        </Col>
      </Row>

      <Row style={{ marginBottom: 64 }}>
        <Col>
          <h3 className={style.title}>タグ</h3>
        </Col>
        <Col>
          <InputTag setTags={setTags} tagList={registeredPlan['tags']} />
          {/* <InputTag tagList={registeredPlan['tags']} /> */}
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
  // 新規登録ボタンを押した時は、isNewCreatePlanがtrueになり、新規登録の処理を行う
  isNewCreatePlan: state.plan.isNewCreatePlan,
})

const mapDispatchToProps = (dispatch) => ({
  // プランの登録
  createPlanEvent: (planContent) => dispatch(createPlan(planContent)),
  // プランの入力項目に空白がないか確認
  checkInputItemEvent: (planItem) => dispatch(checkPlanItem(planItem)),
  // プランのupdateを更新
  updatePlanEvent: (planItem) => dispatch(updatePlan(planItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InputPlanItem)
