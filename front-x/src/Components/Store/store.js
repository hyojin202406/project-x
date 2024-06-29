import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './Auth/Reducer'

const rootResucers = combineReducers({
  auth: authReducer,
})

export const store = legacy_createStore(rootResucers, applyMiddleware(thunk))
