
import { createStore, combineReducers} from "redux"

// import planData from './reducer/planReducer'
// import appReducer from './reducer/appReducer'
import accountReducer from './reducers/accountReducer'
import planReducer from "./reducers/planReducer";


export const rootReducer = combineReducers({
    account: accountReducer,
    plan: planReducer,
    // accountReducer,
});

const store = createStore(rootReducer);
export default store

