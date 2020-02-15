import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../store';
import TopePage from '../containers/TopPage';
import SignInPage from '../containers/SignInPage';
import SignUpPage from '../containers/SignUpPage';
import CreatePlan from '../containers/CreatePlan';
import Auth from './Auth';
import TimeLine from '../containers/TimeLine';

// import PlanList from "../containers/PlanList"
// import Header from '../containers/Header'
// import Data from '../containers/Data'
// import '../styles/App.scss';
// import { readEvents } from '../actions'
// import { connect } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TopePage} />
          <Route exact path="/sign_in" component={SignInPage} />
          <Route exact path="/sign_up" component={SignUpPage} />

          <Auth>
            <Switch>
              <Route exact path="/create_plan" component={CreatePlan} />
              <Route exact path="/time_line" component={TimeLine} />
            </Switch>
          </Auth>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

// class App extends React.Component{
//   componentDidMount(){
//     this.props.readEvents()
//     console.log("最初Apiで読み込む")
//   }

//   render(){

//       // const {number, plus} = this.props

//     return(
//       <div className="wrap">
//         <Header/>
//         <Data />
//         <PlanList/>
//       </div>
//     )
//   }
// };

// const mapStateToProps = (state) => state

// const mapDispatchToProps = dispatch => {
//   return {
//     readEvents: () => dispatch(readEvents())
//   }
// }

// // const mapDispatchToProps = ({readEvents})

// export default connect(mapStateToProps, mapDispatchToProps)(App);
