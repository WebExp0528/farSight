import React from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const ButtonBack = props => {
  const handleClickBackBtn = () => {
    props.history.goBack();
  };

  return (
    <Button onClick={handleClickBackBtn}>
      <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>Back
    </Button>
  );
};

export default withRouter(ButtonBack);
