import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import withFormikField from 'components/WithFormikField';

export const InputUSDFormik = withFormikField()(props => {
  return (
    <InputGroup>
      <InputGroup.Text>$</InputGroup.Text>
      <FormControl {...props} />
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup>
  );
});
