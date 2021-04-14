import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Page from 'pages';
import { createStore } from '@redux';

import './lumen.bootstrap.css';
import { ToastContainer } from 'component';

library.add(fas);

const history = createBrowserHistory();
const store = createStore(undefined, history);

export const App = props => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Page />
        </Router>
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
