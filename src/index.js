import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import ProviderWithContext from "./components/Platform/ProviderWithContext";

ReactDOM.render(
  <BrowserRouter>
    <ProviderWithContext>
      <App />
    </ProviderWithContext>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
