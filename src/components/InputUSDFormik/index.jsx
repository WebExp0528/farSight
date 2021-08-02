import React from 'react';
import { useField } from 'formik';
import { InputGroup, FormControl, Form } from 'react-bootstrap';

export const InputUSDFormik = props => {
  let { label, labelProps, name, helperProps, helperType = 'invalid', ...rest } = props;
  const [field, meta] = useField(name);
  return (
    <Form.Group className="my-2">
      {label && <Form.Label {...labelProps}>{label}</Form.Label>}
      <InputGroup hasValidation>
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl
          name={name}
          isInvalid={meta.touched && meta.error}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...rest}
        />
        <InputGroup.Text>.00</InputGroup.Text>
        {meta.touched && meta.error && (
          <Form.Control.Feedback type={helperType} {...helperProps}>
            {meta.error}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};
