import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// アカウント取得など非同期の処理を行うのでreduxThunkを読み込み
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import accountReducer from './reducers/accountReducer';
import planReducer from './reducers/planReducer';
import tagReducer from './reducers/tagReducer';
import profileReducer from './reducers/profileReducer';

// creatStoreをするときにcreateRootReducerは引数として、historyを受け取る
export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    plan: planReducer,
    tag: tagReducer,
    profile: profileReducer,
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

// =====================================================================================
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

// router関係は、もうこれ通りするしかない
// https://github.com/supasate/connected-react-router
// =====================================================================================

// =====================================================================================
// applyMiddlewareの引数に、適用する Middleware を入れる。
// applyMiddlewareを使用すると、dispatchが実行された際に、
// dispatchではなく指定した Middleware が呼び出されるようになる。
// dispatchの内部で、actionがtypeプロパティを持ったプレーンなオブジェクトか判断する
// Middlewareは、dispatch and getStateを引数として受け取る
// =====================================================================================
