import React from "react";
import SignIn from "./components/SignIn";
import Contact from "./components/example";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./config";
import AddBook from './components/AddBook'

function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.userReducer.uid);


  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: "LOGGED_USER",
        user: user
      });
    }
  });

  if (loggedUser) {
    return (
      <div className="App">
        <Dashboard></Dashboard>
        <AddBook/>

      </div>
    );
  } else {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

export default App;
