import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from './reducers'

const settings = require('electron-settings')

const state = {
  langs: {
    from: 'en',
    to: 'it'
  },
  speed: {
    from: false,
    to: false
  },
  fromBar: {
    from1: 'en',
    from2: 'it',
    from3: 'es'
  },
  toBar: {
    to1: 'it',
    to2: 'en',
    to3: 'es'
  },
  fromActive: [true, false, false],
  toActive: [true, false, false]
}

var initialState = settings.has('settings') ? settings.get('settings') : state

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  sagaMiddleware
]

const allReducers = combineReducers(reducers)

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const store = createStore(
  allReducers,
  initialState,
  enhancer
)

store.runSaga = sagaMiddleware.run

export default store