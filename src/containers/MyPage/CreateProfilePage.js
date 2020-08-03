import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

// action
import { feachAccountId, feachProfileDetail, finUpdateProfile } from '../../store/actions/profile'

// Component
import RightSide from '../../components/profile/createProfile/rightSide'
import LeftSide from '../../components/profile/createProfile/leftSide'

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
