import { applyMiddleware, createStore, combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// アカウント取得など非同期の処理を行うのでreduxThunkを読み込み
import reduxThunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

// localStorageにデータを保存するために必要
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'

// reducer
import accountReducer from './reducers/accountReducer'
import planReducer from './reducers/planReducer'
import tagReducer from './reducers/tagReducer'
import profileReducer from './reducers/profileReducer'
import messageReducer from './reducers/messageReducer'
import planContractReducer from './reducers/planContractReducer'

// 永続化の設定
const authPersistConfig = {
  key: 'auth', // Storageに保存されるキー名を指定する
  storage: storage, // 保存先としてlocalStorageがここで設定される
  whitelist: ['authToken', 'yorozuId'],
}

// creatStoreをするときにcreateRootReducerは引数として、historyを受け取る
export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account: persistReducer(authPersistConfig, accountReducer), // accountReducerは永続化設定するReducerとして定義
    plan: planReducer,
    tag: tagReducer,
    profile: profileReducer,
    message: messageReducer,
    planContract: planContractReducer,
  })

export const history = createBrowserHistory()

export default function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    applyMiddleware(
      reduxThunk,
      routerMiddleware(history) // for dispatching history actions
    )
  )

  const persistor = persistStore(store)

  return { store, persistor }
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

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// データの永続化に関して
// データをリロードした時に、データが消えなようにpersistを設定
// importするもの
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist';
// persistReducer(設定, 指定したreducer),
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
