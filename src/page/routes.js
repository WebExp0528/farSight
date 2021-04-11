import React from 'react';

import Createstatusscreen from 'page/CreateStatusScreen';
import Login from './Login';
import NewLinkSent from './NewLinkSent';
import StatusScreen from './StatusScreen';
import PhotosDescriptionscreen from './UploadPhotos/PhotosDescriptionscreen';
import Photoscreen from './UploadPhotos/Photosscreen';
import Workorderdetails from './WorkOrder/Workorderdetails';
import Workorderlist from './WorkOrder/Workorderlist';
import BidsDescriptionscreen from './Bidsfeature/BidsDescriptionscreen';

const ROUTES = [
  { type: 'route', path: '', exact: true, component: Workorderlist },
  { type: 'route', path: 'requestMagicLink', component: NewLinkSent },
  { type: 'route', path: 'magicLink/:token', component: Login },
  { type: 'route', path: 'Workorderdetails/:won', component: Workorderdetails },
  { type: 'route', path: 'Createstatuscreen', component: Createstatusscreen },
  { type: 'route', path: 'StatusScreen', component: StatusScreen },
  { type: 'route', path: 'Photosscreen', component: Photoscreen },
  { type: 'route', path: 'PhotosDescriptionscreen', component: PhotosDescriptionscreen },
  { type: 'route', path: 'BidsDescriptionscreen', component: BidsDescriptionscreen }
];

export default ROUTES;
