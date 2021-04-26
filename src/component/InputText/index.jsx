import React from 'react';
import { withFormikField } from 'component/WithFormikField';
import { Form } from 'react-bootstrap';

export const InputText = withFormikField('')(Form.Control);
