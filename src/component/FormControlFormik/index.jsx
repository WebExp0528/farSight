import { withFormikField } from 'component/WithFormikField';
import { Form } from 'react-bootstrap';

export const FormControlFormik = withFormikField('')(Form.Control);
