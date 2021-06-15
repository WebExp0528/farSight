import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BreadCrumb from 'components/BreadCrumb';
import { axios } from 'helpers';

import cls from './layout.module.scss';
import { withRouter } from 'react-router';

const LayoutHeader = props => {
  const { history } = props;
  const handleClickDemo = () => {
    axios
      .get('/demo', {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(_res => {
        history.push('/');
      })
      .catch(_err => {
        history.push('/');
      });
  };
  return (
    <Navbar className={cls.navbar} bg="primary" variant="dark" fixed="top">
      <Container className="justify-content-between">
        <Nav className="mr-auto">
          <BreadCrumb />
        </Nav>
        <Nav>
          <Navbar.Brand className="d-flex align-items-center">
            <Button size="sm" variant="outline-info" onClick={handleClickDemo}>
              Start Demo &gt;
            </Button>
          </Navbar.Brand>
          <Navbar.Brand className="d-flex align-items-center">{navigator.platform}</Navbar.Brand>
          <div className={cls.logoWrapper}>
            <FontAwesomeIcon icon={['fas', 'eye']} size="lg" style={{ margin: 0, padding: 0, color: 'white' }} />
            <FontAwesomeIcon icon={['fas', 'chess-rook']} size="2x" style={{ margin: 0, padding: 0, color: 'white' }} />
          </div>
          <Navbar.Brand className={cls.brandWrapper}>
            FarSight™
            <div className={cls.brandText}>by Northsight</div>
          </Navbar.Brand>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default withRouter(LayoutHeader);
