import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import { MyAccordionButton } from 'components';

import cls from './action-menu.module.scss';

const getMenuButtons = won => [
  { path: 'photos/before', name: 'Before Photos', key: 'before_photos', required: true },
  { path: '', name: 'Read Instructions', key: 'read_instructions', required: true },
  { path: 'photos/during', name: 'During Photos', key: 'during_photos' },
  { path: `submit/${won?.survey_name || 'basic'}`, name: 'Complete Survey', key: 'submit_survey', required: true },
  { path: 'photos/after', name: 'After Photos', key: 'after_photos' },
  //{ path: 'submit/final', name: 'Review & Submit', key: 'submit' },
  { path: 'bids', name: 'Create Bid', key: 'bids' }
];

export const ActionMenu = ({ won, match, history, staticContext: _staticContext, ...props }) => {
  const handleClickActionMenu = path => {
    history.push(path ? `${match.url}/${path}` : match.url);
  };

  return (
    <Accordion className="fixed-bottom" {...props}>
      <Accordion.Item eventKey="orderActions" className={cls.wrapper}>
        <Accordion.Header>
          Actions Menu
          <FontAwesomeIcon
            icon={['fas', 'bars']}
            size="md"
            style={{ position: 'absolute', left: '105px', bottom: '17px', color: 'whitesmoke' }}
          />
        </Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              {getMenuButtons(won).map(({ path, name, required = false }, index) => (
                <Col className="p-1 d-grid gap-2" key={index} xs={6} style={{ position: 'relative' }}>
                  {required && (
                    <FontAwesomeIcon
                      icon={['fas', 'star']}
                      size="xs"
                      style={{ position: 'absolute', right: '12px', bottom: '14px', color: 'whitesmoke' }}
                    />
                  )}
                  <MyAccordionButton eventKey="orderActions" size="sm" onClick={() => handleClickActionMenu(path)}>
                    {name}
                  </MyAccordionButton>
                </Col>
              ))}
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

//@ts-ignore
export default withRouter(ActionMenu);
