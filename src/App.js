import React from "react";
import SignIn from "./components/SignIn";
import ResetPsswd from './components/ResetPsswd'
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./config";
import AddBookModal from "./components/AddBookModal";
import InfoModal from "./components/InfoModal";
import { BrowserRouter, HashRouter, Route, Link, Switch, NavLink } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userReducer.uid);

  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: "LOGGED_USER",
        user: user,
      });
    }
  });

  if (loggedUser) {
    return (
      <div className="App">
        <Dashboard></Dashboard>
        <AddBookModal />
        <InfoModal />
      </div>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path={"/"} component={SignIn}/>
          <Route path="/reset" component={ResetPsswd}/>       
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
