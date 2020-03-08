import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reduxThunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import planReducer from './reducers/planReducer';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

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
