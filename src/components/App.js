import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from '../store';
import Router from '../routes/Router';
import { PersistGate } from 'redux-persist/integration/react';

// ConnectedRouterを使う上で必要
const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Routeコンポーネントに引数としてhistoryを渡す */}
        <Router history={history} />
      </PersistGate>
    </Provider>
  );
};

export default App;

// =====================================================================================
// Providerにstoreを渡すことによって、
// providerより下のコンポーネントでstoreを使うことができる
// =====================================================================================
