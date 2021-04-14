import React from 'react';

import Createstatusscreen from 'page/CreateStatusScreen';
import Login from './Login';
import NewLinkSent from './NewLinkSent';
import StatusScreen from './StatusScreen';
import PhotosDescriptionscreen from './UploadPhotos/PhotosDescriptionscreen';
import Photoscreen from './UploadPhotos/Photosscreen';
import WorkOrderDetails from './WorkOrder/Details';
import WorkOrderList from './WorkOrder/List';
import BidsDescriptionscreen from './Bidsfeature/BidsDescriptionscreen';
import WorkOrder from './WorkOrder';

const ROUTES = [
  { key: 'MAGIC_LINK_TOKEN', type: 'route', path: 'magicLink/:token', component: Login },
  { key: 'REQUEST_MAGIC_LINK', type: 'route', path: 'requestMagicLink', component: NewLinkSent },
  { key: 'CREATE_STATUS_SCREEN', type: 'route', path: 'Createstatuscreen', component: Createstatusscreen },
  { key: 'STATUS_SCREEN', type: 'route', path: 'StatusScreen', component: StatusScreen },
  { key: 'PHOTO_SCREEN', type: 'route', path: 'Photosscreen', component: Photoscreen },
  {
    key: 'PHOTO_SCREEN_DESCRIPTION',
    type: 'route',
    path: 'PhotosDescriptionscreen',
    component: PhotosDescriptionscreen
  },
  { key: 'BIDS_DESCRIPTION_SCREEN', type: 'route', path: 'BidsDescriptionscreen', component: BidsDescriptionscreen },
  {
    key: 'WORK_ORDER',
    type: 'route',
    path: 'work-orders',
    component: WorkOrder,
    routes: [
      { key: 'WORK_ORDER_DETAILS', type: 'route', path: ':won', component: WorkOrderDetails },
      { key: 'WORK_ORDER', type: 'route', path: '', component: WorkOrderList },
      { key: 'WORK_ORDER_REDIRECT', type: 'redirect', path: '' }
    ]
  },
  { key: 'HOME_REDIRECT', type: 'redirect', path: 'work-orders' }
];

export default ROUTES;
