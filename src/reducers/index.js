import {combineReducers } from "redux"

import planData from './planReducer'
import appReducer from './appReducer'
import accountReducer from './accountReducer'


export default combineReducers({
    appReducer,
    planData,
    accountReducer,
});