import { withFormikField } from 'components/WithFormikField';
import { Form } from 'react-bootstrap';

export const FormControlFormik = withFormikField('')(Form.Control);
