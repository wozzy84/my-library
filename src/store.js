import {
  createStore,
  combineReducers,
  applyMiddleware,

} from "redux"
import logger from "redux-logger"

//Reducers

import {
  userReducer,
  drawerOpen,
  openAddModal,
  updateTable
} from "./reducers"

//combineReducers
const reducers = combineReducers({
  userReducer: userReducer,
  drawerOpen: drawerOpen,
  openAddModal: openAddModal,
  updateTable: updateTable

})

//store
const store = createStore(reducers, applyMiddleware(logger))

export {
  store
}