import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './Auth/Reducer'
import { twitReducer } from './Twit/Reducer'

const rootResucers = combineReducers({
  auth: authReducer,
  twit: twitReducer,
})

export const store = legacy_createStore(rootResucers, applyMiddleware(thunk))
