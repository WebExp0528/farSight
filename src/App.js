import React, { Component } from "react";
import './bootstrap.min.css';
//import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Workorderlist from './component/Workorderlist';
import Workorderdetails from './component/Workorderdetails';
import Createstatuscreen from './component/Createstatusscreen';
import StatusScreen from './component/StatusScreen'
import Photosscreen from './component/UploadPhotos/Photosscreen'
import PhotosDescriptionscreen from './component/UploadPhotos/PhotosDescriptionscreen'
import Submitworkorder from './component/Submitworkorder/Submitworkorder'
import Createbiditem   from './component/Bidsfeature/Createbiditem'
import BidsDescriptionscreen from './component/Bidsfeature/BidsDescriptionscreen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faHistory,faEye, faChessRook } from '@fortawesome/free-solid-svg-icons';
import {Badge, Card, Container,Form, Image, InputGroup, Row, Spinner, Navbar} from 'react-bootstrap';
import LogIn from './component/LogIn'
import NewLinkSent from './component/NewLinkSent'


class App extends Component {
  render() {

    return (
      <div>
                        <Navbar style={{color:"whitesmoke",paddingBottom:0,paddingTop:5}} bg="primary" variant="dark">
                
                <div style={{textAlign:"center", margin:-10,padding:0,boxSize:0}}>
                  <div style={{margin:-5,padding:-5}}>
                    <FontAwesomeIcon icon={faEye} size="lg" style={{margin:0,padding:0}}/>
                  </div>
                  <div style={{margin:0,padding:0}}>
                    <FontAwesomeIcon icon={faChessRook} size="2x" style={{margin:0,padding:0}}/>
                  </div>
                </div>
                <Navbar.Brand style={{marginLeft:15}}>FarSight™<div style={{marginTop:-8,paddingTop:0,fontSize:"0.75em"}}>by Northsight</div></Navbar.Brand>
              </Navbar>
        <Router>
          <Switch>
            <Route path="/" exact component={Workorderlist} />
            <Route path="/requestMagicLink" component={NewLinkSent} />
            <Route path="/magicLink/:token" component={LogIn} />
            <Route path="/Workorderdetails/:won" component={Workorderdetails} />
            <Route path="/Createstatuscreen" component={Createstatuscreen} />
            <Route path="/StatusScreen" component={StatusScreen} />
            <Route path="/Photosscreen" component={Photosscreen} />
            <Route path="/PhotosDescriptionscreen" component={PhotosDescriptionscreen} />
            <Route path="/Submitworkorder" component={Submitworkorder} />
            <Route path="/Createbiditem" component={Createbiditem} />
            <Route path="/BidsDescriptionscreen" component={BidsDescriptionscreen} />
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
