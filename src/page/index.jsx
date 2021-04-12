import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, Button } from 'react-bootstrap';

import { LayoutHeader, RenderRoutes } from 'component';
import Workorderlist from 'page/WorkOrder/Workorderlist';
import Workorderdetails from 'page/WorkOrder/Workorderdetails';
import Createstatuscreen from 'page/CreateStatusScreen';
import StatusScreen from 'page/StatusScreen';
import Photosscreen from 'page/UploadPhotos/Photosscreen';
import PhotosDescriptionscreen from 'page/UploadPhotos/PhotosDescriptionscreen';
import BidsDescriptionscreen from 'page/Bidsfeature/BidsDescriptionscreen';
import LogIn from 'page/Login';
import NewLinkSent from 'page/NewLinkSent';

import Routes from './routes';

export const App = props => {
  console.log('~~~~~~~ app props111', props);
  //TODO: Update folder structure.  Create "components" and "pages" folders.
  //Only Component Folders (containing a single component definition) should start with upper case
  //REcommended folders to add (perhaps):
  //containers, models, constants, pages, forms, etc.
  //TODO: Move divs to Layout Component (research)
  //TODO: Move NavBar into a new Content Component (as stateless Functional Component)

  const handleClickBackBtn = () => {};

  return (
    <div>
      <LayoutHeader />
      <RenderRoutes routes={Routes} />
    </div>
  );
};

export default App;
