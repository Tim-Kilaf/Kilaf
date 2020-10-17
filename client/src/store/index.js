import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import reducerLogin from './reducers/reducerLogin'
import reducerItem from './reducers/reducerItem'

const reducer = combineReducers({
    isLogin: reducerLogin,
    reducerItem
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(thunk);
const enhancer = composeEnhancers(middlewares);

const store = createStore(reducer, enhancer)

export default store