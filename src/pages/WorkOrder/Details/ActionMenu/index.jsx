import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import { MyAccordionButton } from 'components';

import cls from './action-menu.module.scss';

const getMenuButtons = won => [
  { path: '', name: 'Read Instructions', key: 'read_instructions', required: true },
  { path: 'bids', name: 'Create Bid', key: 'bids' },
  { path: 'photos/before', name: 'Before Photos', key: 'before_photos', required: true },
  { path: `submit/${won?.survey_name || 'basic'}`, name: 'Complete Survey', key: 'submit_survey', required: true },
  { path: 'photos/during', name: 'During Photos', key: 'during_photos' },
  { path: 'submit/final', name: 'Review & Submit', key: 'submit' },
  { path: 'photos/after', name: 'After Photos', key: 'after_photos' }
];

export const ActionMenu = ({ won, match, history, ...props }) => {
  const handleClickActionMenu = path => {
    history.push(path ? `${match.url}/${path}` : match.url);
  };

  return (
    <Accordion className="fixed-bottom" defaultActiveKey="orderActions" {...props}>
      <Accordion.Item eventKey="orderActions" className={cls.wrapper}>
        <Accordion.Header>Actions Menu...</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              {getMenuButtons(won).map(({ path, name, required = false }, index) => (
                <Col className="p-1 d-grid gap-2" key={index} xs={6} style={{ position: 'relative' }}>
                  {required && (
                    <FontAwesomeIcon
                      icon={['fas', 'star']}
                      size="xs"
                      style={{ position: 'absolute', right: '25px', bottom: '20px', color: 'whitesmoke' }}
                    />
                  )}
                  <MyAccordionButton eventKey="orderActions" size="sm" onClick={e => handleClickActionMenu(path)}>
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
