import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'antd'
import ImageForm from '../../components/form/ImageForm/index'
import { createProfile, feachAccountId } from '../../store/actions/profile'

const CreateProfilePage = (props) => {
  console.log(props)
  const [nickname, setNickname] = useState('')
  const [yorozuyaName, setYorozuyaName] = useState('')
  const [yorozuId, setYorozuId] = useState('')
  const [profileImage, setProfileImage] = useState([])
  const [profileDescription, setProfileDescription] = useState('')
  const [planThumbnailImage, setPlanThumbnailImage] = useState([])
  // const [twitterAccount, setTwitterAccount] = useState('')
  // const [facebookAccount, setFacebookAccount] = useState('')
  // const [instagramAccount, setInstagramAccount] = useState('')

  // プロフィール作成の時は、アカウントIDが必要になるので、最初に取得するs
  useEffect(() => {
    props.readAccountIdEvent(props.authToken)
  })

  // 登録ボタンを押した時のイベント
  const register = () => {
    const profile = {
      accountId: props.accountId,
      nickname,
      yorozuyaName,
      yorozuId,
      profileImage,
      profileDescription,
      planThumbnailImage,
      // twitterAccount,
      // facebookAccount,
      // instagramAccount,
    }
    props.createProfileEvent(profile)
  }

  return (
    <>
      {/* プロフィール画面 */}

      <Row style={{ marginTop: 20, marginBottom: 32 }}>
        <Col>
          <h4>どんなよろず屋なのか教えてください!!</h4>
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>ニックネーム</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </Col>
      </Row>

      {/*  ニックネーム */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>よろず屋名</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={yorozuyaName} onChange={(e) => setYorozuyaName(e.target.value)} />
        </Col>
      </Row>

      {/*  yorozuId */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={10}>よろずやのURL(※一度決めたら変更できません)</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={yorozuId} onChange={(e) => setYorozuId(e.target.value)} />
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
          />
        </Col>
      </Row>

      {/* プランのサムネール画像 */}
      <Row style={{ marginBottom: 8 }}>
        <Col span={18}>よろずやのサムネール画像</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={9}>
          <ImageForm image={planThumbnailImage} setImage={setPlanThumbnailImage} />
        </Col>
      </Row>

      {/*  twiterアカウント */}
      {/* <Row style={{ marginBottom: 8 }}>
        <Col span={4}>twiterアカウント</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={twitterAccount} onChange={(e) => setTwitterAccount(e.target.value)} />
        </Col>
      </Row> */}

      {/*  facebookアカウント */}
      {/* <Row style={{ marginBottom: 8 }}>
        <Col span={4}>facebookアカウント</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={facebookAccount} onChange={(e) => setFacebookAccount(e.target.value)} />
        </Col>
      </Row> */}

      {/*  instagramアカウント */}
      {/* <Row style={{ marginBottom: 8 }}>
        <Col span={4}>instagramアカウント</Col>
      </Row>

      <Row style={{ marginBottom: 48 }}>
        <Col span={10}>
          <Input value={instagramAccount} onChange={(e) => setInstagramAccount(e.target.value)} />
        </Col>
      </Row> */}

      {/* 送信ボタン */}
      {/* <Row type="flex" justify="center"> */}
      <Row>
        <Col>
          <Button type="primary" htmlType="submit" size="large" style={{ width: 200 }} onClick={register}>
            登録
          </Button>
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
