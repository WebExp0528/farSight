import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonBack from '../component/ButtonBack';
import { axios } from 'utils';

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
      .then(res => {
        // history.push('/');
      })
      .catch(err => {
        // history.push('/');
      });
  };
  return (
    <Navbar className={cls.navbar} bg="primary" variant="dark" fixed="top">
      <Nav className="mr-auto">
        <ButtonBack />
      </Nav>
      <Navbar.Brand>
        <Button size="sm" variant="outline-info" onClick={handleClickDemo}>
          Start Demo &gt;
        </Button>
      </Navbar.Brand>
      <Navbar.Brand>{navigator.platform}</Navbar.Brand>
      <div className={cls.logoWrapper}>
        <div>
          <FontAwesomeIcon icon={['fas', 'eye']} size="lg" style={{ margin: 0, padding: 0, color: 'white' }} />
        </div>
        <div>
          <FontAwesomeIcon icon={['fas', 'chess-rook']} size="2x" style={{ margin: 0, padding: 0, color: 'white' }} />
        </div>
      </div>
      <Navbar.Brand style={{ marginLeft: 15 }}>
        FarSight™
        <div style={{ marginTop: -8, paddingTop: 0, fontSize: '0.75em' }}>by Northsight</div>
      </Navbar.Brand>
    </Navbar>
  );
};

export default withRouter(LayoutHeader);
