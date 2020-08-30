import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

// action
import { feachAccountId, feachProfileDetail, finUpdateProfile } from '../../store/actions/profile'

// Component
// PC用 components
import RightSide from '../../components/profile/createProfile/pc/rightSide'
import LeftSide from '../../components/profile/createProfile/pc/leftSide'

// スマホ用 components
import InputProfile from '../../components/profile/createProfile/mobile/inputProfile'
import RegisteredImage from '../../components/profile/createProfile/mobile/registeredImage'

// ipad用 components
import IpadInputProfile from '../../components/profile/createProfile/ipad/inputProfile'

const CreateProfilePage = (props) => {
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // プロフィール作成の時は、アカウントIDが必要になるので、最初に取得する
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  useEffect(() => {
    props.readAccountIdEvent(props.authToken)
  }, [])

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // プレビューでデータが更新できるように、更新処理を行ったらデータを更新する
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  if (props.isUpdataProfile) {
    props.readProfileDetailEvent(props.yorozuId)
    // isUpdataProfileをtrueからfalseにする これをしないと永遠にreadProfileDetailEventを行ってしまう
    props.finUpdateProfile()
  }

  return (
    <>
      {/* プロフィール画面 */}

      <Row>
        {/* PC用 */}
        <Col xs={0} md={0} lg={24} style={{ marginTop: 20, marginBottom: 32 }}>
          <h4>どんな、よろず屋なのか教えてください!</h4>
        </Col>
        {/* ipad用  タブとの空白*/}
        <Col xs={0} md={24} lg={0} style={{ marginTop: 32 }}></Col>
      </Row>

      {/* pc用のプロフィール作成画面 */}
      <Row>
        {/* プロフィール作成画面の左側のレイアウト */}
        <Col xs={0} md={0} lg={7}>
          <LeftSide registeredProfile={props.registeredProfile} />
        </Col>

        {/* 右と左のブロックの間の隙間 */}
        <Col xs={0} md={0} lg={1}></Col>

        {/* プロフィール作成画面の右側のレイアウト */}
        <Col xs={0} md={0} lg={16} style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <RightSide registeredProfile={props.registeredProfile} accountId={props.accountId} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* スマ用の作成画面 */}
      <Row type="flex" justify="center">
        {/* <Col xs={24} md={0} style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }}> */}
        <Col xs={24} md={0}>
          {/* 入力項目を真ん中ににするために、flex center */}
          <InputProfile registeredProfile={props.registeredProfile} accountId={props.accountId} />
        </Col>

        {/* 現在登録しているprofile画像 */}
        <Col xs={24} md={0}>
          <RegisteredImage registeredProfile={props.registeredProfile} />
        </Col>
      </Row>

      {/* ipad用の作成画面 */}
      <Row type="flex" justify="center">
        {/* 入力項目を真ん中ににするために、flex center */}
        <Col xs={0} md={24} lg={0} style={{ border: 'solid 1px #d5d5d5', borderRadius: '8px' }}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <IpadInputProfile registeredProfile={props.registeredProfile} accountId={props.accountId} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
const mapStateToProps = (state) => ({
  authToken: state.account.authToken.access,
  // プロフィール作成の時は、アカウントIDが必要になるので、最初に取得する
  accountId: state.profile.accountId,
  // profileの登録項目
  registeredProfile: state.profile.registeredProfile,
  // プロフィールデータを読み込む時に必要になる
  yorozuId: state.account.yorozuId,
  // プロフィールが登録されたら,trueになる
  isUpdataProfile: state.profile.isUpdateProfile,
})

const mapDispatchToProps = (dispatch) => ({
  // プロフィール作成の時は、アカウントIDが必要になるので、最初に取得する
  readAccountIdEvent: (authToken) => dispatch(feachAccountId(authToken)),
  // プロフィールを更新した時に、万屋の詳細ページを取得する(プランや、よろずやユーザーの情報等)
  readProfileDetailEvent: (id) => dispatch(feachProfileDetail(id)),
  // updataProfileをtrueからfalseにする
  finUpdateProfile: () => dispatch(finUpdateProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)
