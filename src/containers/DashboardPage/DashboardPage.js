import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'

// components
// pc用
import DashboardSale from '../../components/dashboard/pc/dashboardSale'
import DashboardCarge from '../../components/dashboard/pc/dashboardCharge'
// mobile用
import MobileDashboardSale from '../../components/dashboard/mobile/dashboardSale'
import MobileDashboardCarge from '../../components/dashboard/mobile/dashboardCharge'

// action
import { feachMySentPlanContract, readContractPlanList, feachPurchasersList } from '../../store/actions/planContract'

const Dashboard = (props) => {
  useEffect(() => {
    props.readMySentPlanContractEvent(props.authToken)
    props.readPurchasersListEvent(props.authToken)
  }, [])

  // props.mySentPlanContractListは、httpメソッドで処理をするから遅いので、かっこに値を入れる
  useEffect(() => {
    props.readContractPlanListEvent()
  }, [props.mySentPlanContractList])

  function callback(key) {
    console.log(key)
  }
  return (
    <>
      {/* タイトル */}
      <Row type="flex" justify="center">
        {/* pc用 */}
        <Col xs={0} md={18} style={{ marginTop: 48 }}>
          <h2 style={{ textAlign: 'center' }}>ダッシュボード</h2>
        </Col>
        {/* スマホ用 */}
        <Col xs={22} md={0} style={{ marginTop: 16 }}>
          <h3>ダッシュボード</h3>
        </Col>
      </Row>

      {/* pc用タブ */}
      <Row type="flex" justify="center">
        <Col xs={0} md={18}>
          <Tabs type="card" onChange={callback} defaultActiveKey="1" style={{ marginTop: 16, minHeight: 720 }}>
            {/* 売り上げタブのコンテント */}
            <Tabs.TabPane tab="売上" key="1">
              <DashboardSale purchasersList={props.purchasersList} />
            </Tabs.TabPane>

            {/* 課金タブのコンテント */}
            <Tabs.TabPane tab="課金" key="2">
              <DashboardCarge contractPlanlist={props.contractPlanlist} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>

      {/* モバイル用 タブ */}
      <Row type="flex" justify="center">
        <Col xs={22} md={0}>
          <Tabs onChange={callback} defaultActiveKey="1" size="small" style={{ minHeight: 720, marginBottom: 72 }}>
            {/* 売り上げタブのコンテント */}
            <Tabs.TabPane tab="売上" key="1">
              <MobileDashboardSale purchasersList={props.purchasersList} />
            </Tabs.TabPane>

            {/* 課金タブのコンテント */}
            <Tabs.TabPane tab="課金" key="2">
              <MobileDashboardCarge contractPlanlist={props.contractPlanlist} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => ({
  // 自分が契約しているプランのリスト(課金)
  contractPlanlist: state.planContract.contractPlanList,
  // 自分のプランを購入してくれた人のリスト
  purchasersList: state.planContract.purchasersList,
  // 自分が契約申請を送っている人のリスト(相手からプラン契約の申請を承認されていないものを入る)
  mySentPlanContractList: state.planContract.mySentPlanContractList,
  authToken: state.account.authToken.access,
})

const mapDispatchToProps = (dispatch) => ({
  // 自分が送信したプラン契約の申請一覧を取得する
  readMySentPlanContractEvent: (authToken) => dispatch(feachMySentPlanContract(authToken)),
  // 自分のプランを購入してくれた人のリストを取得する
  readPurchasersListEvent: (authToken) => dispatch(feachPurchasersList(authToken)),
  // 自分が契約しているプランの一覧を取得する
  readContractPlanListEvent: () => dispatch(readContractPlanList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
