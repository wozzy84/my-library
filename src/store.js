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
  updateTable,
  handleDownloadLink,
  setReference,
  clearStorage,
  openInfoModal,
  isEditing
} from "./reducers"

//combineReducers
const reducers = combineReducers({
  userReducer: userReducer,
  drawerOpen: drawerOpen,
  openAddModal: openAddModal,
  updateTable: updateTable,
  downloadLink: handleDownloadLink,
  reference:setReference,
  clearStorage: clearStorage,
  openInfoModal:openInfoModal,
  isEditing: isEditing

})

//store
const store = createStore(reducers, applyMiddleware(logger))

export {
  store
}