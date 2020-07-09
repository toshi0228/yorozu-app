import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'antd'
import ImageForm from '../../components/form/ImageForm/index'
import { createProfile, feachAccountId } from '../../store/actions/profile'

import CreateProfileModal from '../../components/modal/createProfileModal'

const CreateProfilePage = (props) => {
  // console.log(props)
  const [nickname, setNickname] = useState('')
  const [yorozuyaName, setYorozuyaName] = useState('')
  const [yorozuId, setYorozuId] = useState('')
  const [profileImage, setProfileImage] = useState([])
  const [profileDescription, setProfileDescription] = useState('')
  const [yorozuyaThumbnailImage, setYorozuyaThumbnailImage] = useState([])

  // 登録ボタンを押した時の、モーダルのテキスト
  const [alertText, setAlertText] = useState('')
  // 空白のエラーがある場合にtrue
  const [isEmpty, setIsEmpty] = useState(false)
  // trueになるとモダールが表示される
  const [alertModal, setAlertModal] = useState(false)

  // プロフィール作成の時は、アカウントIDが必要になるので、最初に取得するs
  useEffect(() => {
    props.readAccountIdEvent(props.authToken)
  })

  // プロフィールを送信する時に、空白がエラ-をだす
  const chenckRegisterProfile = (profile) => {
    const items = [nickname, yorozuyaName, yorozuId, profileImage, profileDescription, yorozuyaThumbnailImage]
    const emptyItems = []
    // inputがエラーの項目を抽出する
    items.forEach((item, index) => {
      if (item === '' || item.length === 0) {
        emptyItems.push(index)
      }
    })

    if (emptyItems.length === 0) {
      setIsEmpty(false)
      setAlertText('プロフィールの保存ができました。プレビューを見てみましょう!!')
      // 保存したことを通知するモーダル
      setAlertModal(true)
      // 登録をする
      props.createProfileEvent(profile)
    } else {
      setAlertText('入力項目に空白の場所があるようです。ご確認お願いします!!')
      setIsEmpty(true)
      setAlertModal(true)
    }
  }

  // 登録ボタンを押した時のイベント
  const register = () => {
    const profile = {
      accountId: props.accountId,
      nickname,
      yorozuyaName,
      yorozuId,
      profileImage,
      profileDescription,
      yorozuyaThumbnailImage,
    }

    // 空白がないかチェックしてから、登録処理を行う
    chenckRegisterProfile(profile)
  }

  return (
    <>
      {/* プロフィール画面 */}

      <Row style={{ marginTop: 20, marginBottom: 32 }}>
        <Col>
          <h4>よろず屋なのか教えてください!!</h4>
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>ニックネーム</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="例) よろさん、ずっさん、よろろ" />
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>よろず屋名</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input
            value={yorozuyaName}
            onChange={(e) => setYorozuyaName(e.target.value)}
            placeholder="例) サプライズ屋、モーニングコール屋、おしゃべり屋"
          />
        </Col>
      </Row>

      {/* プランのサムネール画像 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>よろずやのサムネール画像 (※よろずやのtopページで表示される画像になります)</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={9}>
          <ImageForm image={yorozuyaThumbnailImage} setImage={setYorozuyaThumbnailImage} />
        </Col>
      </Row>

      {/*  yorozuId */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>よろずやのID(※一度決めたら変更できません。半角文字でお願いします)</Col>
        <Col span={18}>また、このIDがあなたのプランのURLにもなります 例) http://yorozu/plan/●●●</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={yorozuId} onChange={(e) => setYorozuId(e.target.value)} placeholder="例) yorozu、mornig、yororo" />
        </Col>
      </Row>

      {/* プロフィール画像 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>プロフィール画像の登録</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={9}>
          <ImageForm image={profileImage} setImage={setProfileImage} />
        </Col>
      </Row>

      {/* プロフィール説明 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>プロフィール説明</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={18}>
          <Input.TextArea
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 6 }}
            placeholder="どんなよろず屋なのか書いて見てください"
          />
        </Col>
      </Row>

      {/* 送信ボタン */}
      <Row type="flex" justify="center">
        {/* <Row> */}
        <Col>
          <Button type="primary" htmlType="submit" size="large" style={{ width: 400 }} onClick={register}>
            登録
          </Button>
          {/* 保存に成功もしくは、エラーの時にモーダルが表示される */}
          {alertModal && <CreateProfileModal modalText={alertText} error={isEmpty} setModal={setAlertModal} />}
        </Col>
      </Row>
    </>
  )
}
const mapStateToProps = (state) => ({
  authToken: state.account.authToken.access,
  accountId: state.profile.accountId,
})

const mapDispatchToProps = (dispatch) => ({
  // プロフィールを作成する処理
  readAccountIdEvent: (authToken) => dispatch(feachAccountId(authToken)),
  createProfileEvent: (authToken) => dispatch(createProfile(authToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)
