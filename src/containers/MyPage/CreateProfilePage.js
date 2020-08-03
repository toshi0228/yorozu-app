import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'antd'

// import ImageForm from '../../components/form/ImageForm/index'
import {
  // createProfile,
  feachAccountId,
  // updateProfile,
  feachProfileDetail,
  finUpdateProfile,
  // checkInputItem,
} from '../../store/actions/profile'

// import host from '../../constants/url'

// Component
import RightSide from '../../components/profile/createProfile/rightSide'
import LeftSide from '../../components/profile/createProfile/leftSide'

const CreateProfilePage = (props) => {
  // const [nickname, setNickname] = useState(props.registeredProfile['nickname'])
  // const [yorozuyaName, setYorozuyaName] = useState(props.registeredProfile['yorozuyaName'])
  // const [yorozuId, setYorozuId] = useState(props.registeredProfile['yorozuId'])
  // const [profileDescription, setProfileDescription] = useState(props.registeredProfile['profileDescription'])
  // const [profileImage, setProfileImage] = useState([])
  // const [yorozuyaThumbnailImage, setYorozuyaThumbnailImage] = useState([])

  // プロフィールオブジェクト
  // const profile = {
  //   accountId: props.accountId,
  //   nickname,
  //   yorozuyaName,
  //   yorozuId,
  //   profileImage,
  //   profileDescription,
  //   yorozuyaThumbnailImage,
  // }

  // プロフィールの項目の配列 空白があるかどうか確認する時に必要
  // const items = [nickname, yorozuyaName, yorozuId, profileImage, profileDescription, yorozuyaThumbnailImage]

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

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // 登録ボタンを押した時のイベント
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // const register = () => {
  //   // props.registeredProfile.yorozuIdがあれば、登録内容の修正、なければ、新規登録
  //   if (props.registeredProfile.yorozuId) {
  //     // 登録内容の処理
  //     props.updateProfileEvent(profile)
  //   } else {
  //     // 新規登録の処理を行う前に、まず空白がないかチェックしてから、登録処理を行う
  //     // もし、ここで上手くいけば、props.isToRegisterがfalaeからtrueになる
  //     props.checkInputItem(items)
  //   }
  // }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // checkInputItemで、空白があるか確認したあとなければ、isToRegisterはtrueになり
  // 以下で登録の作業をを行う
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // if (props.isToRegister) {
  //   props.createProfileEvent(profile)
  // }

  return (
    <>
      {/* プロフィール画面 */}

      <Row style={{ marginTop: 20, marginBottom: 32 }}>
        <Col>
          <h4>どんな、よろず屋なのか教えてください!!</h4>
        </Col>
      </Row>

      <Row>
        {/* プロフィール作成画面の左側のレイアウト */}
        <Col span={8}>
          <Row>
            {/* 右サイドと少し隙間を開けるために4/24分の隙間を開ける */}
            <Col span={20}>
              {/* <LeftSide planData={planData} /> */}
              <LeftSide registeredProfile={props.registeredProfile} />
            </Col>
          </Row>
        </Col>

        {/* プロフィール作成画面の右側のレイアウト */}
        <Col style={{ border: 'solid 0.5px #d5d5d5', borderRadius: '8px' }} span={16}>
          {/* // Row,Colのイメージは,入力項目はm一つの紙になかに、中心 20/24 までに範囲にするイメージ */}
          <Row type="flex" justify="center">
            <Col span={20} style={{ paddingTop: '32px' }}>
              <RightSide registeredProfile={props.registeredProfile} accountId={props.accountId} />
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
  // checkInputItemで、プロフィールの入力項目に空白がなければこの値がtrueになる
  // isToRegister: state.profile.isToRegister,
})

const mapDispatchToProps = (dispatch) => ({
  readAccountIdEvent: (authToken) => dispatch(feachAccountId(authToken)),
  // プロフィールを作成する処理
  // createProfileEvent: (profileData) => dispatch(createProfile(profileData)),
  // プロフィールの更新処理
  // updateProfileEvent: (profileData) => dispatch(updateProfile(profileData)),
  // プロフィールを更新した時に、万屋の詳細ページを取得する(プランや、よろずやユーザーの情報等)
  readProfileDetailEvent: (id) => dispatch(feachProfileDetail(id)),
  // updataProfileをtrueからfalseにする
  finUpdateProfile: () => dispatch(finUpdateProfile()),
  // プロフィールの入力項目を確認する
  // checkInputItem: (item) => dispatch(checkInputItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfilePage)
