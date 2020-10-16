import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages import
import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'
import Register from './register/Register'
import Appbar from '../components/appbar/Appbar'

export default function Index() {
  return (
    <Router>
      <Appbar />
      <Switch>
        <Route
          path="/"
          exact
          component={Dashboard}
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
