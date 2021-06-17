import React from 'react';
import { Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const MyAccordionButton = ({ eventKey, children, onClick, ...props }) => {
  const handleClickBtn = useAccordionButton(eventKey, onClick);

  return (
    <Button onClick={handleClickBtn} {...props}>
      {children}
    </Button>
  );
};

export default MyAccordionButton;
