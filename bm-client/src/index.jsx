import React from 'react';
import ReactDOM from 'react-dom';
import {LineChartContainer} from './components/LineChart';
import benchmarkApp from './reducers/index';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
// import App from './components/App';
import createLogger from 'redux-logger';

const logger = createLogger();

// const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const store = applyMiddleware(logger)(createStore)(benchmarkApp);
fetch('/data.json')
  .then(response => response.json())
  .then(json => {
    store.dispatch({
      type: 'SET_DATA',
      data: json
    });
  });

ReactDOM.render(
  <Provider store={store}>
    <LineChartContainer />
  </Provider>,
  document.getElementById('root')
);
