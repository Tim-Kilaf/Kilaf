import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages import
import Dashboard from './dashboard/Dashboard'

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
    </Router>
  )
}
