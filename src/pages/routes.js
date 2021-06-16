import Login from './Login';
import NewLinkSent from './NewLinkSent';
import PhotoScreen from './WorkOrder/Details/PhotosScreen';
import WorkOrderDetails from './WorkOrder/Details';
import WorkOrderList from './WorkOrder/List';
import WorkOrder from './WorkOrder';
import BidsScreen from './WorkOrder/Details/BidsScreen';
import SubmitWorkOrder from './WorkOrder/Details/SubmitWorkOrder';
import Instructions from './WorkOrder/Details/Instructions';

// import CreateStatusScreen from './CreateStatusScreen';
// import StatusScreen from './StatusScreen';
// import PhotosDescriptionScreen from './UploadPhotos/PhotosDescriptionScreen';
// import BidsDescriptionScreen from './BidsFeature/BidsDescriptionScreen';

const ROUTES = [
  { key: 'MAGIC_LINK_TOKEN', type: 'route', path: 'magicLink/:token', component: Login },
  {
    key: 'REQUEST_MAGIC_LINK',
    type: 'route',
    path: 'requestMagicLink',
    component: NewLinkSent
  },
  // { key: 'CREATE_STATUS_SCREEN', type: 'route', path: 'Createstatuscreen', component: CreateStatusScreen },
  // { key: 'STATUS_SCREEN', type: 'route', path: 'StatusScreen', component: StatusScreen },
  // { key: 'PHOTO_SCREEN', type: 'route', path: 'Photosscreen', component: PhotoScreen },
  // {
  //   key: 'PHOTO_SCREEN_DESCRIPTION',
  //   type: 'route',
  //   path: 'PhotosDescriptionscreen',
  //   component: PhotosDescriptionScreen
  // },
  // { key: 'BIDS_DESCRIPTION_SCREEN', type: 'route', path: 'BidsDescriptionscreen', component: BidsDescriptionScreen },
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
          { key: 'bids', type: 'route', path: 'bids', component: BidsScreen },
          { key: 'submit', type: 'route', path: 'submit/:surveyName', component: SubmitWorkOrder },
          { key: 'instructions', type: 'route', path: '', exact: true, component: Instructions },
          { key: 'redirect_details', type: 'redirect', path: '' }
        ]
      },
      { key: 'list', type: 'route', path: '', exact: true, component: WorkOrderList },
      { key: 'redirect_list', type: 'redirect', path: '' }
    ]
  },
  { key: 'HOME_REDIRECT', type: 'redirect', path: 'work-orders' }
];

export default ROUTES;
