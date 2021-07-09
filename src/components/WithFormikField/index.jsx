import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

/**
 * Wrap Component by Formik
 *
 * @param {string} defaultName Default Field Name
 * @returns
 */
export function withFormikField(defaultName = '') {
  return function (Component) {
    /**
     *
     * @param {{label?: string, labelProps?: any, name?:string, helperProps?: any, helperType?:'valid'|'invalid', [index:string]:any}} props
     * @returns
     */
    function ComponentWithFormik(props) {
      let { label, labelProps, name = defaultName, helperProps, helperType = 'invalid', ...rest } = props;

      const [field, meta] = useField(name);

      return (
        <Form.Group className="my-2">
          {label && <Form.Label {...labelProps}>{label}</Form.Label>}
          <Component
            name={name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={meta.touched && meta.error}
            {...rest}
          />
          {meta.touched && meta.error && (
            <Form.Control.Feedback type={helperType} {...helperProps}>
              {meta.error}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      );
    }
    return ComponentWithFormik;
  };
}

export default withFormikField;
