import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import redux
import { Provider, useSelector } from 'react-redux'
import store from '../store'

// pages import
import Dashboard from './dashboard/Dashboard'
import Detail from './detail/Detail'
import Login from './login/Login'
import Register from './register/Register'
import Appbar from '../components/appbar/Appbar'
import CreateItem from './createItem/CreateItem'
import Cart from './cart/Cart'

export default function Index() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={BeforeEnterContainer} />
          <Route path="/register" component={Register} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    </Provider>
    
  )
}

function BeforeEnterContainer() {
  return (
    <div>
      <Route
        path="/login"
        component={Login}
      />
    </div>
  )
}

function DefaultContainer() {
  return (
    <div>
      <Appbar />
      <Route
        path="/cart"
        component={Cart}
      />
      <PrivateRoute path='/' exact>
        <Dashboard />
      </PrivateRoute>       
      <PrivateRoute path='/bid/:id'>
        <Detail />
      </PrivateRoute>   
      <PrivateRoute path='/create'>
        <CreateItem />
      </PrivateRoute> 
    </div>
  )
}

function PrivateRoute({ children, ...rest }) {
  const isLogin = useSelector((state) => state.isLogin)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('access_token') ? (
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
