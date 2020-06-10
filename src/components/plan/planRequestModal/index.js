import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input } from 'antd'
import { planRequest } from '../../../store/actions/plan'
import { sendMessage } from '../../../store/actions/message'
import { isSentPlanRequest } from '../../../store/actions/planRequest'
import PlanRequestBtn from './planRequestBtn'

// ====================================================================
// プランリクエストのモーダル
// ====================================================================

const PlanRequestModal = (props) => {
  console.log('PlanRequestModal')
  console.log(props.planOwnerYorozuId)
  console.log(props.isSentPlanRequest)
  console.log('プランリクエストが承認されたか')
  console.log(props.planRequestStatus.isApproval)

  // isVisibleがtrueの時に、モーダルが現れる
  const [isVisible, setIsVisible] = useState(false)
  // プランリクエストする時のメッセージ
  const [requestMessage, setRequestMessage] = useState('')
  const [planRequestBtnText, setPlanRequestBtnText] = useState('リクエストを送る')

  // リクエストを送るボタンを押した時のアクション
  const showModal = () => {
    setIsVisible(true)
  }

  // モーダルの中での送信ボタンを押した時の処理
  const hundleSubmit = () => {
    // requestDataは、プランのリクエストの時に必要な情報
    const requestData = {
      // リクエストの送り主(ログインしているユーザー)
      senderYorozuId: props.loginUserYorozuId,
      // リクエストの送り先のユーザー(プランオーナーのyorozuId)
      receiverYorozuId: props.planOwnerYorozuId,
    }

    // requestMessageDataは、モーダルに書き込んだテキストメッセージをプランオーナーに送る
    // ※プランオーナーは、メッセージをメッセージルームで確認することができる
    const requestMessageData = {
      // リクエストの送り主(ログインしているユーザー)
      senderYorozuId: props.loginUserYorozuId,
      // リクエストの送り先のユーザー(プランオーナーのyorozuId)
      receiverYorozuId: props.planOwnerYorozuId,
      messageContent: requestMessage,
    }

    setIsVisible(false)
    // プランのリクエストの処理
    props.planRequestEvent(requestData)
    // プランのリクエストした時のメッセージをプランオーナーに送信
    props.sendMessageEvent(requestMessageData)
    // 送信したら、メッセージのデータを初期化する
    setRequestMessage('')
  }

  // モーダルの中でのキャンセルボタンを押した時の処理
  const handleCancel = () => {
    setIsVisible(false)
  }

  // プランページに移動した時に、ログインユーザーがプランリクエストを送信した事がある万屋か確認する
  // (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
  useEffect(() => {
    props.isSentPlanRequestEvent(props.planOwnerYorozuId)
    console.log('ここに来た')
    if (props.planRequestStatus.isApproval) {
      console.log('trueここに来た')
      setPlanRequestBtnText('契約する')
      props.isSentPlanRequest = true
    }
  }, [props.planOwnerYorozuId, props.mySendPlanRequestList])
  // useEffectの第二の引数にプランのオーナーが変更したら、処理が走るようにしたいので,props.planOwnerYorozuIdを入れる
  // props.planOwnerYorozuIdが変更するのがHTTPリクエストで遅いので、ここが変更されたら処理を変更する

  return (
    <div>
      {/* isPlanRequestが, trueの時だけコンポーネントが表示される */}
      {props.isSentPlanRequest && (
        <Button type="primary" disabled>
          プランリクエストの承認中
        </Button>
      )}

      {/* isPlanRequestが, falseの時だけコンポーネントが表示される */}
      {props.isSentPlanRequest || (
        <Button type="primary" onClick={showModal}>
          {planRequestBtnText}
        </Button>
      )}

      <PlanRequestBtn />

      <Modal
        title="リクエスト"
        visible={isVisible}
        onOk={hundleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={hundleSubmit}>
            送信
          </Button>,
        ]}
      >
        <p style={{ marginBottom: 20 }}>
          よろず屋がプランリクエストを承認した後に、契約ができるように <br />
          なります。 相談内容を記入した上でよろず屋と契約が可能かどうか確認しましょう。
        </p>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 12 }}
          placeholder="契約を考えているので、承認をお願いいたします"
          onChange={(e) => setRequestMessage(e.target.value)}
        />
        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.profile,
  // リクエストの送り主(ログインしているユーザー)
  loginUserYorozuId: state.account.yorozuId,
  // リクエストの送り先のユーザー(プランオーナーのyorozuId)
  planOwnerYorozuId: state.profile.profileDetail.yorozuId,
  // ログインしているユーザーがプランリクエストを送った事があるよろずやか確認
  isSentPlanRequest: state.planRequest.isSentPlanRequest,
  // ログインしているユーザーのよろずやのプランページごとのプランリクエスト状況
  planRequestStatus: state.planRequest.planRequestStatus,
  // 自分が送信したプランリクエスト(実際にデータとして、使わないがこの取得した値が変化したら、内容を変更するようにする)
  mySendPlanRequestList: state.planRequest.mySendPlanRequestList,
})

const mapStateToDispatch = (dispatch) => ({
  // プランのリクエストを送るアクション
  planRequestEvent: (requestData) => dispatch(planRequest(requestData)),
  // プランリクエストのメッセージを送る処理
  sendMessageEvent: (messageData) => dispatch(sendMessage(messageData)),
  // プランページに移動した時に、ログインユーザーがプランリクエストを送信した事がある万屋か確認する
  // (リクエストを送信した事がある万屋ならには、プランリクエストをできないようにしたい)
  isSentPlanRequestEvent: (planOwnerYorozuId) => dispatch(isSentPlanRequest(planOwnerYorozuId)),
})

export default connect(mapStateToProps, mapStateToDispatch)(PlanRequestModal)

// todo
// リクエストボタンの制御
