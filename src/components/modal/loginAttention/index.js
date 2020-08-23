import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Modal, Button } from 'antd'

import routes from '../../../routes/index'
import PlanDataContext from '../../../contexts/PlanDataContext'

import styles from './index.module.scss'

const LoginAttention = () => {
  // planContractModalにpropsで受け取るplanDataを読み込む
  const props = useContext(PlanDataContext)

  const handleSubmit = () => {
    console.log('ログイン処理')
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // モーダルの中でのキャンセルボタンを押した時の処理
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const handleCancel = () => {
    props.setIsPlanContractModalVisible(false)
  }
  return (
    <>
      <Modal
        title="会員登録すると、契約ができます!!"
        // visiblがtrueなら、モーダルが表示される
        visible={props.isPlanContractModalVisible}
        onCancel={handleCancel}
        footer={[
          <Link key="submit" to={routes.siginIn()}>
            <Button onClick={handleSubmit}>ログインをして契約をする</Button>
          </Link>,
        ]}
      >
        <Row>
          {/* 説明 */}
          <Col span={14}>
            <h3>タイトル</h3>
            <p>{props.planData.title}</p>
            <h3>料金</h3>
            <p>{`￥${props.planData.price} 円`}</p>
            <h3>お支払い方法</h3>
            <p>クレジットカード</p>
            <p>
              <img src="https://d2aj9sy12tbpym.cloudfront.net/javascripts/dist/assets/cards-93fdb7f8c04e768123771a8f33e49f63.svg" />
            </p>
          </Col>

          {/* 画像 */}
          <Col span={8} offset={2} style={{ background: '#ff7d6e' }}>
            <img alt="example" src={props.planData.image} style={{ width: '100%', height: 110, borderRadius: 8 }} />
          </Col>
        </Row>

        {/* 失敗した時のエラーメッセージ
        {isCardErrorMessage && <p style={{ color: 'red', fontSize: '10px' }}>{cardErrorMessage}</p>}
        クレジットカードの情報を入力
        <CreditCardForm /> */}

        <h3 style={{ color: '#ff7d6e' }}>注意事項</h3>
        <div style={{ marginBottom: 20 }} className={styles.attention}>
          <ul>
            <li>解約は自由に行なえますが、課金後の返金は行っておりません。</li>
          </ul>
          <ul>
            <li>毎月の契約は契約日から1ヶ月となります。例えば5/20に契約すると次回は6/20の更新となります。</li>
          </ul>
          <ul>
            <li>契約がつづく限り、毎月自動で課金が行われます。</li>
          </ul>
          <ul>
            <li>初回契約にかぎり、48時間以内によろずやから返答がない場合は自動キャンセル・返金となります。</li>
          </ul>
        </div>

        <p style={{ marginBottom: 10 }}></p>
      </Modal>
    </>
  )
}

export default LoginAttention

// =========================================================================
// モーダルのキーに関して  2020 7 17

// footer={[
//   <Link key="submit" to={routes.siginIn()}>
//     <Button onClick={handleSubmit}>ログインをして契約をする</Button>
//   </Link>,
// ]}

// modalのfooterには、親コンポーネントに上記のように、親コンポーネントにkeyをつけないと
// いけない。もしつけなければ、以下のようにエラー文が発生する

// Check the render method of `Dialog`.
// It was passed a child from LoginAttention.
// =========================================================================
