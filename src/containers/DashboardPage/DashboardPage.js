import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs } from 'antd'
import DashboardSale from '../../components/dashboard/dashboardSale/index'
import DashboardCarge from '../../components/dashboard/dashboardCharge'
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
        <Col style={{ fontSize: 18, marginTop: 48 }}>ダッシュボード</Col>
      </Row>

      {/* タブ */}
      <Row type="flex" justify="center" style={{ marginTop: 20, height: '80vh' }}>
        <Col span={18}>
          <Tabs type="card" onChange={callback} defaultActiveKey="1">
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
