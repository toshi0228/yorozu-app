import React, { useState } from 'react'
import { Button, Col, Row, Input } from 'antd'

// Component
import ImageForm from '../../../form/ImageForm'

import style from './index.module.scss'

// ======================================================================
// createProfilePageの右側 プロフィールの入力フォーム
// ======================================================================

const RightSide = (props) => {
  console.log('RightSide 確認したい事')
  console.log(props)
  const [nickname, setNickname] = useState(props.registeredProfile['nickname'])
  const [yorozuyaName, setYorozuyaName] = useState(props.registeredProfile['yorozuyaName'])
  const [yorozuId, setYorozuId] = useState(props.registeredProfile['yorozuId'])
  const [profileDescription, setProfileDescription] = useState(props.registeredProfile['profileDescription'])
  const [profileImage, setProfileImage] = useState([])
  const [yorozuyaThumbnailImage, setYorozuyaThumbnailImage] = useState([])

  // プロフィールオブジェクト
  const profile = {
    accountId: props.accountId,
    nickname,
    yorozuyaName,
    yorozuId,
    profileImage,
    profileDescription,
    yorozuyaThumbnailImage,
  }

  // プロフィールの項目の配列 空白があるかどうか確認する時に必要
  const items = [nickname, yorozuyaName, yorozuId, profileImage, profileDescription, yorozuyaThumbnailImage]

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // 登録ボタンを押した時のイベント
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const register = () => {
    // props.registeredProfile.yorozuIdがあれば、登録内容の修正、なければ、新規登録
    if (props.registeredProfile.yorozuId) {
      // 登録内容の処理
      props.updateProfileEvent(profile)
    } else {
      // 新規登録の処理を行う前に、まず空白がないかチェックしてから、登録処理を行う
      // もし、ここで上手くいけば、props.isToRegisterがfalaeからtrueになる
      props.checkInputItem(items)
    }
  }

  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="center" style={{ marginTop: 16, marginBottom: 32 }}>
        <Col>
          <h3>プロフィールの登録</h3>
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>ニックネーム</h3>
          <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="例) よろさん、ずっさん、よろろ" />
        </Col>
      </Row>

      {/*  よろずや名 */}
      <Row className={style.marginBottom}>
        <Col>
          <h3 className={style.title}>よろず屋名</h3>
          <Input
            value={yorozuyaName}
            onChange={(e) => setYorozuyaName(e.target.value)}
            placeholder="例) サプライズ屋、モーニングコール屋、おしゃべり屋"
          />
        </Col>
      </Row>

      {/* プロフィール画像 */}
      <Row className={style.marginBottom}>
        <h3 className={style.title}>プロフィール画像</h3>
        <Col>
          <ImageForm image={profileImage} setImage={setProfileImage} />
        </Col>
      </Row>

      {/*  yorozuId */}
      <Row className={style.marginBottom}>
        <h3 className={style.title}>よろずやのID</h3>

        <Col span={18}>
          <Input value={yorozuId} onChange={(e) => setYorozuId(e.target.value)} placeholder="例) yorozu、mornig、yororo" />
        </Col>
        {/* 以下に<Row></Row>を入れないと入力の左側に */}
        <Row></Row>
        {/* yorozuIdに関しての注意事項 */}
        <div style={{ fontSize: 8, color: 'red', marginTop: 8 }}>※一度決めたら変更できません。半角文字でお願いします)</div>
        <div style={{ fontSize: 8, color: 'red' }}>※このIDがあなたのプランのURLにもなります 例) http://yorozu/plan/●●●</div>
      </Row>

      {/* プロフィール説明 */}

      <Row style={{ marginBottom: 64 }}>
        <h3 className={style.title}>プロフィール説明</h3>

        <Col>
          <Input.TextArea
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 6 }}
            placeholder="どんなよろず屋なのか書いて見てください"
          />
        </Col>
      </Row>

      {/* 送信ボタン */}
      <Row type="flex" justify="center" style={{ marginBottom: 48 }}>
        <Col>
          <Button type="primary" htmlType="submit" size="large" style={{ width: 200 }} onClick={register}>
            登録
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default RightSide
