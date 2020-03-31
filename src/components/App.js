import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '../store';
// 上記必要なこと

import TopePage from '../containers/TopPage';
import SignInPage from '../containers/SignInPage2';
import SignUpPage from '../containers/SignUpPage2';
import CreatePlan from '../containers/CreatePlan';
import Auth from './Auth';
// import TimeLine from '../containers/TimeLine';
import CreatePlanPage from '../containers/CreatePlanPage';
import PlanListPage from '../containers/PlanListPage';
import PlanDetailPage from '../containers/PlanDetailPage';
import MessagePage from '../containers/MessagePage';
import MessageRoomPage from '../containers/Message/MessageRoomPage';
import { withGuestLayout, withMemberLayout } from './Layouts/RouteWithLayout';
import requireAuth from './requireAuth';
import DashboardPage from '../containers/DashboardPage/DashboardPage';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={withGuestLayout(TopePage)} />
          <Route path="/sign_in" component={withGuestLayout(SignInPage)} />
          <Route path="/sign_up" component={withGuestLayout(SignUpPage)} />
          <Route exact path="/plan" component={withGuestLayout(PlanListPage)} />
          <Route
            exact
            path="/project"
            component={withGuestLayout(DashboardPage)}
          />

          <Route
            path="/plan/detail/:id"
            render={withGuestLayout(PlanDetailPage)}
          />
          <Route exact path="/message" render={withGuestLayout(MessagePage)} />
          <Route
            path="/message/rooms/:id"
            render={withGuestLayout(MessageRoomPage)}
          />

          {/* <Route path="/create_plan" render={withMemberLayout(RequireAuth)} /> */}

          <Route
            path="/create_plan"
            render={withMemberLayout(requireAuth(CreatePlanPage))}
          />

          <Auth>
            <Switch>
              <Route
                exact
                path="/time_line"
                render={withMemberLayout(CreatePlan)}
              />

              {/* 
              <Route
                exact
                path="/time_line"
                render={withGuestLayout(CreatePlanPage)}
              /> */}
            </Switch>
          </Auth>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
