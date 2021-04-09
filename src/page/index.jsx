import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHistory, faEye, faChessRook, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, Button } from 'react-bootstrap';

import { ButtonBack } from 'component';
import Workorderlist from 'component/WorkOrder/Workorderlist';
import Workorderdetails from 'component/WorkOrder/Workorderdetails';
import Createstatuscreen from 'component/Createstatusscreen';
import StatusScreen from 'component/StatusScreen';
import Photosscreen from 'component/UploadPhotos/Photosscreen';
import PhotosDescriptionscreen from 'component/UploadPhotos/PhotosDescriptionscreen';
import Submitworkorder from 'component/Submitworkorder/Submitworkorder';
import Createbiditem from 'component/Bidsfeature/Createbiditem';
import BidsDescriptionscreen from 'component/Bidsfeature/BidsDescriptionscreen';
import LogIn from 'component/LogIn';
import NewLinkSent from 'component/NewLinkSent';

export const App = props => {
  console.log('~~~~~~~ app props', props);
  //TODO: Update folder structure.  Create "components" and "pages" folders.
  //Only Component Folders (containing a single component definition) should start with upper case
  //REcommended folders to add (perhaps):
  //containers, models, constants, pages, forms, etc.
  //TODO: Move divs to Layout Component (research)
  //TODO: Move NavBar into a new Content Component (as stateless Functional Component)

  const handleClickBackBtn = () => {};

  return (
    <div>
      <Navbar style={{ color: 'whitesmoke', paddingBottom: 0, paddingTop: 5 }} bg="primary" variant="dark" fixed="top">
        <Nav className="mr-auto">
          <ButtonBack />
        </Nav>
        <Navbar.Brand>
          <Button float="right" size="sm" variant="outline-info" href="/demo">
            Start Demo &gt;
          </Button>
        </Navbar.Brand>
        <Navbar.Brand>{navigator.platform}</Navbar.Brand>
        <div
          style={{
            textAlign: 'center',
            margin: -10,
            padding: 0,
            boxSize: 0
          }}
        >
          <div style={{ margin: -5, padding: -5 }}>
            <FontAwesomeIcon icon={faEye} size="lg" style={{ margin: 0, padding: 0 }} />
          </div>
          <div style={{ margin: 0, padding: 0 }}>
            <FontAwesomeIcon icon={faChessRook} size="2x" style={{ margin: 0, padding: 0 }} />
          </div>
        </div>
        <Navbar.Brand style={{ marginLeft: 15 }}>
          FarSight™
          <div style={{ marginTop: -8, paddingTop: 0, fontSize: '0.75em' }}>by Northsight</div>
        </Navbar.Brand>
      </Navbar>
      <Switch>
        <Route path="/" exact component={Workorderlist} />
        <Route path="/requestMagicLink" component={NewLinkSent} />
        <Route path="/magicLink/:token" component={LogIn} />
        <Route path="/Workorderdetails/:won" component={Workorderdetails} />
        <Route path="/Createstatuscreen" component={Createstatuscreen} />
        <Route path="/StatusScreen" component={StatusScreen} />
        <Route path="/Photosscreen" component={Photosscreen} />
        <Route path="/PhotosDescriptionscreen" component={PhotosDescriptionscreen} />
        <Route path="/BidsDescriptionscreen" component={BidsDescriptionscreen} />
      </Switch>
    </div>
  );
};

export default App;
