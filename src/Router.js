import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Informations from "./pages/Informations";
import Notes from "./pages/Notes";
import Note from "./pages/Notes/Note";

const routes = [
  { path: "/", component: Home },
  { path: "/notes", component: Notes },
  { path: "/notes/:noteId", component: Note, name: "note" },
  { path: "/informations", component: Informations },
  { path: "*", component: Home },
];

export default () => {
  return (
    <Switch>
      {routes.map((r, index) => {
        return <Route key={index} exact path={r.path} component={r.component} />;
      })}
    </Switch>
  );
};
