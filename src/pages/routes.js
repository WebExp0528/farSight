import React from 'react';

import CreateStatusScreen from './CreateStatusScreen';
import Login from './Login';
import NewLinkSent from './NewLinkSent';
import StatusScreen from './StatusScreen';
import PhotosDescriptionScreen from './UploadPhotos/PhotosDescriptionScreen';
import PhotoScreen from './WorkOrder/Details/PhotosScreen';
import WorkOrderDetails from './WorkOrder/Details';
import WorkOrderList from './WorkOrder/List';
import BidsDescriptionScreen from './BidsFeature/BidsDescriptionScreen';
import WorkOrder from './WorkOrder';
import BidsScreen from './WorkOrder/Details/BidsScreen';
import SubmitWorkOrder from './WorkOrder/Details/SubmitWorkOrder';
import CreateBidItem from './WorkOrder/Details/CreateBidItem';
import Instructions from './WorkOrder/Details/Instructions';

const ROUTES = [
  { key: 'MAGIC_LINK_TOKEN', type: 'route', path: 'magicLink/:token', component: Login },
  {
    key: 'REQUEST_MAGIC_LINK',
    type: 'route',
    path: 'requestMagicLink',
    component: NewLinkSent
  },
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
    key: 'work_order',
    type: 'route',
    path: 'work-orders',
    component: WorkOrder,
    routes: [
      {
        key: 'details',
        type: 'route',
        path: ':won',
        component: WorkOrderDetails,
        routes: [
          { key: 'photos', type: 'route', path: 'photos/:category', component: PhotoScreen },
          { key: 'bids_add', type: 'route', path: 'bids/add', component: CreateBidItem },
          { key: 'bids', type: 'route', path: 'bids', component: BidsScreen },
          { key: 'submit', type: 'route', path: 'submit/:surveyName', component: SubmitWorkOrder },
          { key: 'instructions', type: 'route', path: '', component: Instructions }
        ]
      },
      { key: 'list', type: 'route', path: '', component: WorkOrderList },
      { key: 'redirect_list', type: 'redirect', path: '' }
    ]
  },
  { key: 'HOME_REDIRECT', type: 'redirect', path: 'work-orders' }
];

export default ROUTES;
