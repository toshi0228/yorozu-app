import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
// 上記必要なこと

// urlを読み込む;
import routes from '../routes'

// プロフィール関連(トップページ)
import ProfileListPage from '../containers/ProfilePages/ProfileListPage'
import ProfileDetailPage from '../containers/ProfilePages/ProfileDetailPage'

// アカウント関連
import SignInPage from '../containers/AccountPages/SignInPage'
import SignUpPage from '../containers/AccountPages/SignUpPage'

// メッセージ関連
import MessagePage from '../containers/MessagePages/MessagePage'
import CreateMessage from '../containers/MessagePages/CreateMessage'

// ゲストヘッダーとメンバーヘッダーでレイアウトを変更する
import { withLayout } from '../components/Layouts/RouteWithLayout'

// 認証 トークンがあるか確認
import requireAuth from '../components/requireAuth'

// ダッシュボード
import DashboardPage from '../containers/DashboardPage/DashboardPage'

//管理画面ページ(マイー)
// import CreatePlanPage from '../containers/ManagementPages/CreatePlanPage'
// import CreateProfilePage from '../containers/ManagementPages/CreateProfilePage'
import MyPage from '../containers/MyPage'

// 引数をpropsにして,historyを受け取る
const Router = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        {/* トップページ */}
        <Route exact path={routes.top()} component={withLayout(ProfileListPage)} />

        {/* プロフィール詳細ページ(プランページ) */}
        <Route path={routes.profileDetail(':id')} render={withLayout(ProfileDetailPage)} />

        {/* ログインページ */}
        <Route path={routes.siginIn()} component={withLayout(SignInPage)} />

        {/* 新規登録ページ */}
        <Route path={routes.signUp()} component={withLayout(SignUpPage)} />

        {/* ダッシュボードページ */}
        <Route exact path={routes.dashboard()} component={withLayout(DashboardPage)} />

        {/* メッセージのトップページ */}
        <Route exact path={routes.messageList()} render={withLayout(MessagePage)} />

        {/* メッセージ作成ページ */}
        <Route exact path={routes.createMessage()} render={withLayout(CreateMessage)} />

        {/* プラン作成  */}
        {/* ログインチェックなし */}
        {/* <Route path={routes.createPlan()} render={withMemberLayout(CreatePlanPage)}/> */}

        {/* マイページ(プランやプロフィール作成) */}
        <Route path={routes.myPage()} render={withLayout(requireAuth(MyPage))} />

        {/* ログインチェックあり */}
        {/* <Route path={routes.createPlan()} render={withLayout(requireAuth(CreatePlanPage))} /> */}

        {/* マイページ */}
        {/* <Route path={routes.createProfile()} render={withLayout(CreateProfilePage)} /> */}
      </Switch>
    </ConnectedRouter>
  )
}

export default Router
