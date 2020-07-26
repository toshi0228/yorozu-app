import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Input, Row, Col, Button } from 'antd'
import InputTag from '../../components/form/tagForm/index'
import { createPlan } from '../../store/actions/plan'
import ImageForm from '../../components/form/ImageForm/index'
import { checkPlanItem } from '../../store/actions/plan'

const { TextArea } = Input

const CreatePlanPage = (props) => {
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
    yorozuId: props.yorozuId,
  }

  const planItem = [title, description, image, price, tags]

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  // プランがあるか呼び出す
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==

  // useEffect(() => {
  //   console.log('プランを呼ぶ')
  //   console.log(props.planData)
  // }, [])

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  // 登録ボタンを押した時のアクション
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  const register = () => {
    // props.planDataの初期値 => [] 中身がなければ新規登録の処理
    if (props.planData.length === 0) {
      console.log('新規登録')
      props.checkInputItemEvent(planItem)
    } else {
      console.log('更新処理')
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  // checkInputItemEventでクリアしたら, isToRegisterが
  // falseからtrueになるので、プラン登録を行う
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝==
  if (props.isToRegister) {
    console.log('登録の準備完了')
    props.createPlanEvent(plan)
  }

  const toggleRegisterBtn = () => {
    if (props.yorozuId) {
      // よろずIDがあれば、作成できる(プロフィールを作成済みの場合)
      return (
        <Row type="flex" justify="center">
          <Col>
            <Button type="primary" htmlType="submit" size="large" style={{ width: 400 }} onClick={register}>
              登録
            </Button>
          </Col>
        </Row>
      )
    } else {
      // よろずIDがなければ、作成できない(プロフィールを作成をしていない場合)
      return (
        <Row type="flex" justify="center">
          <Col>
            <Button type="primary" htmlType="submit" size="large" style={{ width: 400 }} onClick={register} disabled>
              プロフィールから作成をお願いします
            </Button>
          </Col>
        </Row>
      )
    }
  }

  return (
    <>
      <div>{props.title}</div>

      <Row style={{ marginTop: 32, marginBottom: 32 }}>
        <Col span={8}>
          <h4>どんなプランがあるのか、教えてください</h4>
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>タイトル</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>イメージ画像の登録</Col>
      </Row>

      {/* 画像登録 */}
      <Row style={{ marginBottom: 48 }}>
        <Col span={9}>
          <ImageForm image={image} setImage={setImage} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>プラン説明</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={18}>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} autoSize={{ minRows: 6, maxRows: 6 }} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>料金</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={7}>
          <Input prefix="￥" suffix="円" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Col>
      </Row>

      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>タグ</Col>
      </Row>

      {/* タグ入力 */}
      <InputTag setTags={setTags} />

      {/* 送信ボタン */}
      {toggleRegisterBtn()}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
    authToken: state.account.authToken.access,
    yorozuId: state.account.yorozuId,
    planData: state.profile.profileDetail['planList'],
    // checkInputItemEventでクリアしたら,isToRegisterがfalseからtrueになる
    isToRegister: state.plan.isToRegister,
  }
}

const mapDispatchToProps = (dispatch) => ({
  // プランの登録
  createPlanEvent: (planContent) => dispatch(createPlan(planContent)),
  // プランの入力項目に空白がないか確認
  checkInputItemEvent: (planItem) => dispatch(checkPlanItem(planItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanPage)
