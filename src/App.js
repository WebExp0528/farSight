import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Workorderlist from './component/Workorderlist';
import Workorderdetails from './component/Workorderdetails';
import Createstatuscreen from './component/Createstatusscreen';
import Navigation from './Navigationbar/Navigation'

class App extends Component {
  render() {

    return (
      <div>
        {/* <Navigation /> */}
        <Router>
        {/* <Navigation /> */}
          <Switch>
            <Route path="/" exact component={Workorderlist} />
            
            <Route path="/Workorderdetails/:won" component={Workorderdetails} />
            
            <Route path="/Createstatuscreen" component={Createstatuscreen} />

          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
