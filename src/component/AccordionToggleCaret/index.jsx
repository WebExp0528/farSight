import React from 'react';
import { AccordionContext, useAccordionToggle, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccordionToggleCaret = ({ children, eventKey, callback = key => {}, ...buttonProps }) => {
  const currentEventKey = React.useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Button onClick={decoratedOnClick} {...buttonProps}>
      {children}
      <FontAwesomeIcon className="float-right" icon={['fas', isCurrentEventKey ? 'caret-down' : 'caret-right']} />
    </Button>
  );
};

export default AccordionToggleCaret;
