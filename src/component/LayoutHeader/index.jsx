import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonBack from './../ButtonBack';

import cls from './layout-header.module.scss';

const LayoutHeader = () => {
  return (
    <Navbar className={cls.navbar} bg="primary" variant="dark" fixed="top">
      <Nav className="mr-auto">
        <ButtonBack />
      </Nav>
      <Navbar.Brand>
        <Button float="right" size="sm" variant="outline-info" href="/demo">
          Start Demo &gt;
        </Button>
      </Navbar.Brand>
      <Navbar.Brand>{navigator.platform}</Navbar.Brand>
      <div
        style={{
          textAlign: 'center',
          margin: -10,
          padding: 0,
          boxSize: 0
        }}
      >
        <div style={{ margin: -5, padding: -5 }}>
          <FontAwesomeIcon icon={['fas', 'eye']} size="lg" style={{ margin: 0, padding: 0, color: 'white' }} />
        </div>
        <div style={{ margin: 0, padding: 0 }}>
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

export default LayoutHeader;
