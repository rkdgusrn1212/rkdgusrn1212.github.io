import * as React from 'react';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-snapshot';

render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
