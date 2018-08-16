import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import {reducer} from './redux'
import {watcher} from './sagas'

//create the saga middleware
const sagaMiddleware = createSagaMiddleware()

//redux devtool middleware
const reduxDevTools=
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//create a store with our reducer above and middleware
let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
)


sagaMiddleware.run(watcher)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root')
);
