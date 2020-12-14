import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Workorderlist from './component/Workorderlist';
import Workorderdetails from './component/Workorderdetails';

class App extends Component {
  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Workorderlist} />
            <Route path="/Workorderdetails/:won" component={Workorderdetails} />
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
