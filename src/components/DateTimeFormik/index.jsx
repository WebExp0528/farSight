import React from 'react';
import { InputGroup } from 'react-bootstrap';
import DateTime from 'react-datetime';
import _ from 'lodash';

import { withFormikField } from '../WithFormikField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DateTimeFormik = withFormikField('')(props => {
  return (
    <InputGroup>
      <DateTime
        closeOnSelect={true}
        closeOnClickOutside={true}
        className="flex-grow-1"
        inputProps={{ readOnly: true }}
        {...props}
      />
      <InputGroup.Text>
        <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
      </InputGroup.Text>
    </InputGroup>
  );
});
