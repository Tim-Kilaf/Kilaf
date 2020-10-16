import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import reducerLogin from './reducers/reducerLogin'

const reducer = combineReducers({
    isLogin: reducerLogin,
    
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(thunk);
const enhancer = composeEnhancers(middlewares);

const store = createStore(reducer, enhancer)

export default store