import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Card, Image } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';

import ModalUpdateStatus from '../ModalUpdateStatus';
import { useIsOpenControls } from 'hooks';

import { genRandomCode } from 'helpers';

import cls from './work-order-list-card.module.scss';
import UploadProgressBar from '../UploadProgressBar';

export const getItemStatus = item => {
  let dueDate = new Date(item.due_date);
  let today = new Date();
  let statusMessage = 'Unknown';
  if (item.approval_status === 'Pre-Pending' || item.approval_status === 'Pending') {
    statusMessage = 'Pending';
    return statusMessage;
  }
  if (dueDate > today) {
    statusMessage = 'On Time';
  }
  if (dueDate === today) {
    statusMessage = 'Due Today';
  }
  if (dueDate < today) {
    statusMessage = 'Past Due';
  }
  return statusMessage;
};

export const getItemStatusBadgeClass = item => {
  let status = getItemStatus(item);
  let itemClass = 'primary';
  switch (status) {
    case 'On Time':
      itemClass = 'success';
      break;
    case 'Due Today':
      itemClass = 'warning';
      break;
    case 'Past Due':
      itemClass = 'danger';
      break;
    default:
      itemClass = 'secondary';
      break;
  }

  return itemClass;
};

const ListCard = props => {
  const { item = {}, match } = props;
  const wonId = item.won;

  const modalControls = useIsOpenControls();

  // let progress = 0;
  // React.useEffect( () => {
  //   const getProgress = async () => {
  //     const photoStorage = createPhotoStorageInstance( wonId );
  //     const total = await photoStorageMetaInstance.getPhotoMeta( wonId );
  //     const photos = await photoStorage.getAllKeys();
  //     progress = Math.floor( ( ( total - photos.length ) / total ) * 100 );
  //   }
  //   getProgress();
  // }, [] );

  return (
    <Card className={cls.cardWrapper} key={`${item.won}-${genRandomCode()}`}>
      <Card.Body style={{ padding: '0.25em' }}>
        <Image
          src={item.image_url_small}
          style={{
            float: 'left',
            width: '20%',
            height: '100%',
            margin: '0.25em',
            marginRight: '2em'
          }}
          thumbnail
          roundedCircle
        />
        <Card.Title>
          <Link to={`${match.url}/${item.won}`}>{item.work_ordered}</Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {item.address_street} {item.address_city}, {item.address_state}
        </Card.Subtitle>
        <Card.Text className="mb-3">{item.description ? renderHTML(item.description) : null}</Card.Text>
        <UploadProgressBar wonId={wonId} />
      </Card.Body>
      <Card.Footer className={cls.footerWrapper}>
        <Button variant="link" size="sm" onClick={modalControls.handleOpen}>
          <FontAwesomeIcon icon={['fas', 'history']} flip="horizontal" />
          &nbsp;Update&nbsp;Status
        </Button>
        <div className="d-flex align-items-center">
          <span className="me-2" style={{ color: 'grey' }}>
            Work&nbsp;Order&nbsp;#{item.won}
          </span>
          <Badge className="me-2" bg="primary">{`Due: ${new Date(item.due_date).toDateString()}`}</Badge>
          <Badge bg={getItemStatusBadgeClass(item)}>{getItemStatus(item)}</Badge>
        </div>
      </Card.Footer>
      <ModalUpdateStatus won={item} {...modalControls} />
    </Card>
  );
};

ListCard.propTypes = {};

export default withRouter(ListCard);
