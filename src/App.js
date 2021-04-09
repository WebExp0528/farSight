import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Page from './page';
import history from './history';

//import './App.css';
import './lumen.bootstrap.css';

library.add(fas);

export const App = props => {
  return (
    <div>
      <Router history={history}>
        <Page />
      </Router>
    </div>
  );
};

export default App;
