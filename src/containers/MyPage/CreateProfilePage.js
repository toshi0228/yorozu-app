import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'antd'
import ImageForm from '../../components/form/ImageForm/index'
import { createProfile, feachAccountId, updateProfile, feachProfileDetail, finUpdateProfile } from '../../store/actions/profile'

import CreateProfileModal from '../../components/modal/createProfileModal'
import host from '../../constants/url'

const CreateProfilePage = (props) => {
  console.log(props.updataProfile)

  const [nickname, setNickname] = useState(props.registeredProfile['nickname'])
  const [yorozuyaName, setYorozuyaName] = useState(props.registeredProfile['yorozuyaName'])
  const [yorozuId, setYorozuId] = useState(props.registeredProfile['yorozuId'])
  const [profileImage, setProfileImage] = useState([])
  // const [profileImage, setProfileImage] = useState(props.registeredProfile['profileImage'])
  const [profileDescription, setProfileDescription] = useState(props.registeredProfile['profileDescription'])
  const [yorozuyaThumbnailImage, setYorozuyaThumbnailImage] = useState([])

  // 登録ボタンを押した時の、モーダルのテキスト
  const [alertText, setAlertText] = useState('')
  // 空白のエラーがある場合にtrue
  const [isEmpty, setIsEmpty] = useState(false)
  // trueになるとモダールが表示される
  const [alertModal, setAlertModal] = useState(false)

  // プロフィール作成の時は、アカウントIDが必要になるので、最初に取得する
  useEffect(() => {
    props.readAccountIdEvent(props.authToken)
  }, [])

  // プレビューでデータが更新できるように、更新処理を行ったらデータを更新する
  if (props.updataProfile) {
    props.readProfileDetailEvent(props.yorozuId)
    // updataProfileをtrueからfalseにする これをしないと永遠にreadProfileDetailEventを行ってしまう
    props.finUpdateProfile()
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // プロフィールを送信する時に、空白がエラ-をだす(新規登録処理)
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const chenckRegisterProfile = (profile) => {
    const items = [nickname, yorozuyaName, yorozuId, profileImage, profileDescription, yorozuyaThumbnailImage]
    const emptyItems = []
    // inputがエラーの項目を抽出する profileImageは、配列なのでitem.lengthが0なら空白とする
    items.forEach((item, index) => {
      if (item === '' || item.length === 0) {
        emptyItems.push(index)
      }
    })

    // 空白がなければ、emptyItemsは0 つまりエラーはなし
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

    // props.registeredProfile.yorozuIdがあれば、登録内容の修正、なければ、新規登録
    if (props.registeredProfile.yorozuId) {
      // 登録内容の処理
      props.updateProfileEvent(profile)
    } else {
      // 新規登録の処理
      // 空白がないかチェックしてから、登録処理を行う
      chenckRegisterProfile(profile)
    }
  }

  return (
    <>
      {/* プロフィール画面 */}

      <Row style={{ marginTop: 20, marginBottom: 32 }}>
        <Col>
          <h4>どんな、よろず屋なのか教えてください!!</h4>
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>ニックネーム</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          {/* <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="例) よろさん、ずっさん、よろろ" /> */}
          <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="例) よろさん、ずっさん、よろろ" />
        </Col>
      </Row>

      {/*  よろずや名 */}
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

      {/* プロフィール画像 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={17}>プロフィール画像の登録</Col>
        <Col span={7} style={{ paddingLeft: 16 }}>
          ※現在登録中のプロフィール画像です
        </Col>
      </Row>

      <Row style={{ marginBottom: 72 }}>
        <Col span={9}>
          <ImageForm image={profileImage} setImage={setProfileImage} />
        </Col>
        <Col offset={8} span={7} style={{ height: 208, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* <img
            style={{ height: 150, width: 150, borderRadius: '50%' }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_CwORn6v_QUcYmGQgZvguXU5q0on8CWnXg&usqp=CAU"
          /> */}
          <img
            style={{ height: 150, width: 150, borderRadius: '50%' }}
            src={`${host.localhost()}${props.registeredProfile.profileImage}`}
          />
        </Col>
      </Row>

      {/*  yorozuId */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>よろずやのID(※一度決めたら変更できません。半角文字でお願いします)</Col>
        <Col span={18}>また、このIDがあなたのプランのURLにもなります 例) http://yorozu/plan/●●●</Col>
      </Row>

      <Row style={{ marginBottom: 72 }}>
        <Col span={10}>
          <Input value={yorozuId} onChange={(e) => setYorozuId(e.target.value)} placeholder="例) yorozu、mornig、yororo" />
        </Col>
      </Row>

      {/* プランのサムネール画像 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={17}>よろずやのサムネール画像 (※よろずやのtopページで表示される画像になります)</Col>
        <Col span={7}>※現在登録中のサムネイルです</Col>
      </Row>

      <Row style={{ marginBottom: 72 }}>
        <Col span={9}>
          <ImageForm image={yorozuyaThumbnailImage} setImage={setYorozuyaThumbnailImage} />
        </Col>
        <Col offset={8} span={7} style={{ backgroundColor: 'red' }}>
          <img style={{ height: 208, width: '100%' }} src={`${host.localhost()}${props.registeredProfile.yorozuyaThumbnailImage}`} />
        </Col>
      </Row>

      {/* プロフィール説明 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>プロフィール説明</Col>
      </Row>

      <Row style={{ marginBottom: 64 }}>
        <Col span={24}>
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
  // profileの登録項目
  registeredProfile: state.profile.registeredProfile,
  // プロフィールデータを読み込む時に必要になる
  yorozuId: state.account.yorozuId,
  // プロフィールが登録されたら,trueになる
  updataProfile: state.profile.updateProfile,
})

const mapDispatchToProps = (dispatch) => ({
  readAccountIdEvent: (authToken) => dispatch(feachAccountId(authToken)),
  // プロフィールを作成する処理
  createProfileEvent: (profileData) => dispatch(createProfile(profileData)),
  // プロフィールの更新処理
  updateProfileEvent: (profileData) => dispatch(updateProfile(profileData)),
  // プロフィールを更新した時に、万屋の詳細ページを取得する(プランや、よろずやユーザーの情報等)
  readProfileDetailEvent: (id) => dispatch(feachProfileDetail(id)),
  // updataProfileをtrueからfalseにする
  finUpdateProfile: () => dispatch(finUpdateProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)
