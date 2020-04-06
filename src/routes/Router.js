import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// 上記必要なこと

// urlを読み込む;
import routes from '../routes';

// アカウント関連
import SignInPage from '../containers/AccountRelatedPages/SignInPage';
import SignUpPage from '../containers/AccountRelatedPages/SignUpPage';

// プラン関連
import CreatePlanPage from '../containers/PlanRelatedPages/CreatePlanPage';
import PlanListPage from '../containers/PlanRelatedPages/PlanListPage';
import PlanDetailPage from '../containers/PlanRelatedPages/PlanDetailPage';

// メッセージ関連
import MessagePage from '../containers/MessageRelatedPages/MessageListPage';
import MessageRoomPage from '../containers/MessageRelatedPages/MessageRoomPage';

// ゲストヘッダーとメンバーヘッダーでレイアウトを変更する
import {
  withGuestLayout,
  withMemberLayout
} from '../components/Layouts/RouteWithLayout';

// 認証 jwtがあるか確認
import requireAuth from '../components/requireAuth';

// ダッシュボード
import DashboardPage from '../containers/DashboardPage/DashboardPage';

// ボツになりそうなコード
import TopePage from '../containers/TopPage';
import CreatePlan from '../containers/ThrowOutCode/CreatePlan';
import ContractingPage from '../containers/ContractingPage/ContractingPage';
// import Auth from '../components/Auth';

// 引数をpropsにして,historyを受け取る
const Router = props => {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        {/* トップページ */}
        <Route
          exact
          path={routes.top()}
          component={withGuestLayout(PlanListPage)}
        />

        {/* ログインページ */}
        <Route
          path={routes.siginIn()}
          component={withGuestLayout(SignInPage)}
        />

        {/* 新規登録ページ */}
        <Route path={routes.signUp()} component={withGuestLayout(SignUpPage)} />

        {/* ダッシュボードページ */}
        <Route
          exact
          path={routes.dashboard()}
          component={withGuestLayout(DashboardPage)}
        />

        {/* プランの詳細ページ */}
        <Route
          path={routes.planDetail()}
          render={withGuestLayout(PlanDetailPage)}
        />

        {/* メッセージのトップページ */}
        <Route
          exact
          path={routes.messageList()}
          render={withGuestLayout(MessagePage)}
        />

        {/* メッセージ詳細ページ */}
        <Route
          path={routes.messageRoom()}
          render={withGuestLayout(MessageRoomPage)}
        />

        {/* <Route path="/create_plan" render={withMemberLayout(RequireAuth)} /> */}

        {/* プラン作成  */}
        <Route
          path={routes.createPlan()}
          render={withMemberLayout(CreatePlanPage)}
        />
        {/* <Route
          path={routes.createPlan()}
          render={withMemberLayout(requireAuth(CreatePlanPage))}
        /> */}

        {/* ボツページ（トップページ） */}
        <Route exact path="/plan" component={withGuestLayout(TopePage)} />

        {/* ボツページ（トップページ） */}
        <Route
          exact
          path={routes.contracting()}
          render={withMemberLayout(ContractingPage)}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;

{
  /* <Auth>
  <Switch>
    <Route exact path="/time_line" render={withMemberLayout(CreatePlan)} />
    <Route exact path="/time_line" render={withGuestLayout(CreatePlanPage)} />
  </Switch>
</Auth> */
}
