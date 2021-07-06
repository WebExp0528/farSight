import React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';

const NavigationBlocker = props => {
  if (props.navigationBlocked) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = null;
  }
  return <Prompt when={props.navigationBlocked} message="Are you sure you want to leave?" />;
};

NavigationBlocker.propTypes = {
  navigationBlocked: PropTypes.bool.isRequired
};

export default NavigationBlocker;
