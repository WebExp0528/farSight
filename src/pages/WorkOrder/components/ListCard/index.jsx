import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Card, Image } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';

import ModalUpdateStatus from '../ModalUpdateStatus';
import { useIsOpenControls } from 'hooks';

import { genRandomCode } from 'helpers';
import UploadProgressBar from '../UploadProgressBar';
import { getItemStatus, getItemStatusBadgeClass } from '../helper';

import cls from './work-order-list-card.module.scss';

const ListCard = props => {
  const { item = {}, match } = props;
  const wonId = item.won;

  const modalControls = useIsOpenControls();

  return (
    <Card className={cls.cardWrapper} key={`${item.won}-${genRandomCode()}`}>
      <Card.Body className="d-flex flex-row align-items-center" style={{ padding: '0.25em' }}>
        <div
          className="d-flex flex-grow-0 flex-shrink-0"
          style={{
            width: '20%',
            height: '100%',
            margin: '0.25em',
            marginRight: '2em'
          }}
        >
          <Image
            src={item.image_url_small}
            thumbnail
            roundedCircle
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 ">
          <Card.Title>
            <Link to={`${match.url}/${item.won}`}>{item.work_ordered}</Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {item.address_street} {item.address_city}, {item.address_state}
          </Card.Subtitle>
          <Card.Text className="mb-3">{item.description ? renderHTML(item.description) : null}</Card.Text>
          <UploadProgressBar wonId={wonId} />
        </div>
      </Card.Body>
      <Card.Footer className={cls.footerWrapper}>
        <div className="d-flex align-items-center flex-grow-1 flex-wrap justify-content-between">
          <Button variant="link" size="sm" onClick={modalControls.handleOpen}>
            <FontAwesomeIcon icon={['fas', 'history']} flip="horizontal" />
            &nbsp;Update&nbsp;Status
          </Button>
          <span className="ms-2 me-2" style={{ color: 'grey' }}>
            Work&nbsp;Order&nbsp;#{item.won}
          </span>
        </div>
        <div className="d-flex align-items-center flex-grow-0 flex-wrap">
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
