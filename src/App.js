import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import Page from 'pages';
import { createStore } from '@redux';
import 'react-datetime/css/react-datetime.css';

import { ToastContainer } from 'components';

library.add(fas);
library.add(far);

const history = createBrowserHistory();
const { store, persistor } = createStore(undefined, history);

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Page />
          </Router>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
