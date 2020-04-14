import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux"
import logger from "redux-logger"

//Reducers

import {
  userReducer
} from "./reducers"

//combineReducers
const reducers = combineReducers({
  userReducer: userReducer,
})

//store
const store = createStore(reducers, applyMiddleware(logger))

export {
  store
}