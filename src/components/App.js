import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from '../store';
import Router from '../routes/Router';

// ConnectedRouterを使う上で必要
const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      {/* Routeコンポーネントに引数としてhistoryを渡す */}
      <Router history={history} />
    </Provider>
  );
};

export default App;

// =====================================================================================
// Providerにstoreを渡すことによって、
// providerより下のコンポーネントでstoreを使うことができる
// =====================================================================================
