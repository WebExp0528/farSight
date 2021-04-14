import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Page from 'page';
import { createStore } from '@redux';

import './lumen.bootstrap.css';

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
      </Provider>
    </div>
  );
};

export default App;
