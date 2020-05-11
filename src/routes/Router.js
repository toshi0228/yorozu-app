import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// 上記必要なこと

// urlを読み込む;
import routes from '../routes';

// プロフィール関連(トップページ)
import ProfileListPage from '../containers/ProfileRelatedPages/ProfileListPage';
import ProfileDetailPage from '../containers/ProfileRelatedPages/ProfileDetailPage';

// アカウント関連
import SignInPage from '../containers/AccountRelatedPages/SignInPage';
import SignUpPage from '../containers/AccountRelatedPages/SignUpPage';

// プラン関連
import CreatePlanPage from '../containers/PlanRelatedPages/CreatePlanPage';

// メッセージ関連
import MessagePage from '../containers/MessageRelatedPages/MessageListPage';
import MessageRoomPage from '../containers/MessageRelatedPages/MessageRoomPage';

// ゲストヘッダーとメンバーヘッダーでレイアウトを変更する
import {
  withGuestLayout,
  withMemberLayout,
} from '../components/Layouts/RouteWithLayout';

// 認証 jwtがあるか確認
import requireAuth from '../components/requireAuth';

// ダッシュボード
import DashboardPage from '../containers/DashboardPage/DashboardPage';

// ボツになりそうなコード
// import TopePage from '../containers/TopPage';
// import CreatePlan from '../containers/ThrowOutCode/CreatePlan';
import ContractingPage from '../containers/ContractingPage/ContractingPage';
import FormPage from '../containers/FormPage';
import MyPage from '../containers/MyPage/MyPage';

// import Auth from '../components/Auth';

// 引数をpropsにして,historyを受け取る
const Router = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        {/* トップページ */}
        <Route
          exact
          path={routes.top()}
          component={withGuestLayout(ProfileListPage)}
        />

        {/* tokenがある時のトップページ */}
        <Route
          exact
          path={routes.memberTop()}
          component={withMemberLayout(requireAuth(ProfileListPage))}
        />

        {/* プロフィール詳細ページ */}
        <Route
          path={routes.profileDetail()}
          render={withGuestLayout(ProfileDetailPage)}
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
        {/* ログインチェックなし */}
        {/* <Route
          path={routes.createPlan()}
          render={withMemberLayout(CreatePlanPage)}
        /> */}
        {/* ログインチェックあり */}
        <Route
          path={routes.createPlan()}
          render={withMemberLayout(requireAuth(CreatePlanPage))}
        />

        {/* マイページ */}
        <Route path={routes.myPage()} render={withMemberLayout(MyPage)} />

        {/* ボツページ（トップページ） */}
        <Route exact path='/plan' component={withGuestLayout(FormPage)} />

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
