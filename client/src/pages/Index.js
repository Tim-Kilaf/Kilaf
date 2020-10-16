import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages import
import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'

export default function Index() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={Dashboard}
        />
      </Switch>
      <Switch>
        <Route
          path="/login"
          component={Login}
        />
      </Switch>
    </Router>
  )
}
