import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reduxThunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import planReducer from './reducers/planReducer';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

// creatStoreをするときにcreateRootReducerは引数として、historyを受け取る
export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    plan: planReducer
  });

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    applyMiddleware(
      reduxThunk,
      routerMiddleware(history) // for dispatching history actions
    )
  );

  return store;
}

// store = createStore()
// sotreはcreateStoreから作られたデータが入っている

// ヒストリ作成ステップ
// (1)createBrowserHistory()でhistoryを作成
// (2)configureStoreでcreateStoreをラッピング
// (3)createStoreの引数に、普通conbireducerを入れるが引数にhistoryを入れるために、
// createRootReducerにhistoryを入れる

// configureStoreでcreatestoreをラップする理由が分からない
// 仮説)ラップしていないと、createRootReducer(history)が作られていないのに、storeが
// 呼びだれてしまうから

// 構造
// createBrowserHistory -> configureStore -> createStore -> createRootReducer -> combineReducers
