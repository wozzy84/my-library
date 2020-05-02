import React from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./config";
import AddBookModal from './components/AddBookModal'
import InfoModal from "./components/InfoModal";

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
        <AddBookModal/>
        <InfoModal/>

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
