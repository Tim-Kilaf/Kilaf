import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages import
import Dashboard from './dashboard/Dashboard'
import Detail from './detail/Detail'
import Login from './login/Login'
import Register from './register/Register'

export default function Index() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={Dashboard}
        />
        <Route
          path={`/bid/:id`}
          component={Detail}
        />
        <Route
          path="/register"
          component={Register}
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
