import React from 'react';

import Createstatusscreen from 'page/CreateStatusScreen';
import Login from './Login';
import NewLinkSent from './NewLinkSent';
import StatusScreen from './StatusScreen';
import PhotosDescriptionscreen from './UploadPhotos/PhotosDescriptionscreen';
import Photoscreen from './UploadPhotos/Photosscreen';
import WorkOrderDetails from './Home/WorkOrderDetails';
import WorkOrderList from './Home/WorkOrderList';
import BidsDescriptionscreen from './Bidsfeature/BidsDescriptionscreen';
import Home from './Home';

const ROUTES = [
  {
    type: 'route',
    path: '',
    exact: true,
    component: Home,
    routes: [
      { type: 'route', path: 'work-orders/:won', component: WorkOrderDetails },
      { type: 'route', exact: true, path: 'work-orders', component: WorkOrderList },
      { type: 'redirect', path: 'work-orders' }
    ]
  },
  { type: 'route', path: 'requestMagicLink', component: NewLinkSent },
  { type: 'route', path: 'magicLink/:token', component: Login },
  { type: 'route', path: 'Createstatuscreen', component: Createstatusscreen },
  { type: 'route', path: 'StatusScreen', component: StatusScreen },
  { type: 'route', path: 'Photosscreen', component: Photoscreen },
  { type: 'route', path: 'PhotosDescriptionscreen', component: PhotosDescriptionscreen },
  { type: 'route', path: 'BidsDescriptionscreen', component: BidsDescriptionscreen }
];

export default ROUTES;
