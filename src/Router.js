import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home'
import Informations from './pages/Informations'

const routes = [
  { path: '/', component: Home },
  { path: '/informations', component: Informations },
]

export default () => {
  return (
    <Switch>
      {
        routes.map(r => {
          return <Route exact path={r.path} component={r.component}/>
        })
      }
    </Switch>
  )
}