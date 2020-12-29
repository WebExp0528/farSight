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
import StatusScreen from './component/StatusScreen'
import Photosscreen from './component/UploadPhotos/Photosscreen'
import PhotosDescriptionscreen from './component/UploadPhotos/PhotosDescriptionscreen'
import Submitworkorder from './component/Submitworkorder/Submitworkorder'
import Createbiditem   from './component/Bidsfeature/Createbiditem'



class App extends Component {
  render() {

    return (
      <div>
        {/* <Navigation /> */}
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Workorderlist} />
            <Route path="/Workorderdetails/:won" component={Workorderdetails} />
            <Route path="/Createstatuscreen" component={Createstatuscreen} />
            <Route path="/StatusScreen" component={StatusScreen} />
            <Route path="/Photosscreen" component={Photosscreen} />
            <Route path="/PhotosDescriptionscreen" component={PhotosDescriptionscreen} />
            <Route path="/Submitworkorder" component={Submitworkorder} />
            <Route path="/Createbiditem" component={Createbiditem} />

          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
