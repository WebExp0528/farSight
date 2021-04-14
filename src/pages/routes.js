import React from 'react';

import CreateStatusScreen from './CreateStatusScreen';
import Login from './Login';
import NewLinkSent from './NewLinkSent';
import StatusScreen from './StatusScreen';
import PhotosDescriptionScreen from './UploadPhotos/PhotosDescriptionScreen';
import PhotoScreen from './UploadPhotos/PhotosScreen';
import WorkOrderDetails from './WorkOrder/Details';
import WorkOrderList from './WorkOrder/List';
import BidsDescriptionScreen from './BidsFeature/BidsDescriptionScreen';
import WorkOrder from './WorkOrder';

const ROUTES = [
  { key: 'MAGIC_LINK_TOKEN', type: 'route', path: 'magicLink/:token', component: Login },
  { key: 'REQUEST_MAGIC_LINK', type: 'route', path: 'requestMagicLink', component: NewLinkSent },
  { key: 'CREATE_STATUS_SCREEN', type: 'route', path: 'Createstatuscreen', component: CreateStatusScreen },
  { key: 'STATUS_SCREEN', type: 'route', path: 'StatusScreen', component: StatusScreen },
  { key: 'PHOTO_SCREEN', type: 'route', path: 'Photosscreen', component: PhotoScreen },
  {
    key: 'PHOTO_SCREEN_DESCRIPTION',
    type: 'route',
    path: 'PhotosDescriptionscreen',
    component: PhotosDescriptionScreen
  },
  { key: 'BIDS_DESCRIPTION_SCREEN', type: 'route', path: 'BidsDescriptionscreen', component: BidsDescriptionScreen },
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
