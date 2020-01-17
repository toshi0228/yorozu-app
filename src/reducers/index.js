import {combineReducers } from "redux"

import planData from './planReducer'
import appReducer from './appReducer'


export default combineReducers({
    appReducer,
    planData,
});