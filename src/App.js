import React from "react";
import Nav from './components/Navigation/Service'
import "./App.scss";

import Paragraph from "./components/Paragraph";
import Router from './Router'

function App() {
  return (
    <div>
      <Nav />
      <div className={`container`}>
        {/*<Paragraph />*/}
        <Router />
      </div>
    </div>
  );
}

export default App;
