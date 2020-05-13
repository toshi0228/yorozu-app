import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
// 上記必要なこと

// urlを読み込む;
import routes from '../routes'

// プロフィール関連(トップページ)
import ProfileListPage from '../containers/ProfileRelatedPages/ProfileListPage'
import ProfileDetailPage from '../containers/ProfileRelatedPages/ProfileDetailPage'

// アカウント関連
import SignInPage from '../containers/AccountRelatedPages/SignInPage'
import SignUpPage from '../containers/AccountRelatedPages/SignUpPage'

// プラン関連
import CreatePlanPage from '../containers/PlanRelatedPages/CreatePlanPage'

// メッセージ関連
import MessagePage from '../containers/MessageRelatedPages/MessageListPage'
import MessageRoomPage from '../containers/MessageRelatedPages/MessageRoomPage'

// ゲストヘッダーとメンバーヘッダーでレイアウトを変更する
import { withLayout } from '../components/Layouts/RouteWithLayout'

// 認証 トークンがあるか確認
import requireAuth from '../components/requireAuth'

// ダッシュボード
import DashboardPage from '../containers/DashboardPage/DashboardPage'

// 依頼した万屋のリストページ
import ContractingPage from '../containers/ContractingPage/ContractingPage'

// 顧客リストのページ
import ClientListPage from '../containers/ClientListPage/ClientListPage'

import MyPage from '../containers/MyPage/MyPage'

// 引数をpropsにして,historyを受け取る
const Router = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        {/* トップページ */}
        <Route exact path={routes.top()} component={withLayout(ProfileListPage)} />

        {/* プロフィール詳細ページ */}
        <Route path={routes.profileDetail()} render={withLayout(ProfileDetailPage)} />

        {/* ログインページ */}
        <Route path={routes.siginIn()} component={withLayout(SignInPage)} />

        {/* 新規登録ページ */}
        <Route path={routes.signUp()} component={withLayout(SignUpPage)} />

        {/* ダッシュボードページ */}
        <Route exact path={routes.dashboard()} component={withLayout(DashboardPage)} />

        {/* 依頼した万屋のリストページ */}
        <Route exact path={routes.contracting()} component={withLayout(ContractingPage)} />

        {/* 顧客リストページ */}
        <Route exact path={routes.clientList()} component={withLayout(ClientListPage)} />

        {/* メッセージのトップページ */}
        <Route exact path={routes.messageList()} render={withLayout(MessagePage)} />

        {/* メッセージ詳細ページ */}
        <Route path={routes.messageRoom()} render={withLayout(MessageRoomPage)} />

        {/* <Route path="/create_plan" render={withMemberLayout(RequireAuth)} /> */}

        {/* プラン作成  */}
        {/* ログインチェックなし */}
        {/* <Route path={routes.createPlan()} render={withMemberLayout(CreatePlanPage)}/> */}

        {/* ログインチェックあり */}
        <Route path={routes.createPlan()} render={withLayout(requireAuth(CreatePlanPage))} />

        {/* マイページ */}
        <Route path={routes.myPage()} render={withLayout(MyPage)} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Router
