import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import createLogger from 'redux-logger';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  {
    // console.log(state);
    return store.dispatch(setState(state));
  }
);

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket),
  logger
)(createStore);

const store = createStoreWithMiddleware(reducer);

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
