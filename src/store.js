
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
    );