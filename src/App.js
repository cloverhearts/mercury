import React from "react";
import Nav from "./components/Navigation/Service";
import "./App.scss";
import Router from "./Router";
import './components/Platform/Management/Notification'

function App() {
  return (
    <div>
      <Nav />
      <div className={`container`}>
        <Router />
      </div>
    </div>
  );
}

export default App;
