import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import redux
import { Provider, useSelector } from 'react-redux'
import store from '../store'

// pages import
import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'
import Register from './register/Register'

export default function Index() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/register"
            component={Register}
          />
          <PrivateRoute path='/'>
            <Dashboard />
          </PrivateRoute>
        </Switch>
          
      </Router>
    </Provider>
    
  )
}

function PrivateRoute({ children, ...rest }) {
  const isLogin = useSelector((state) => state.isLogin)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
