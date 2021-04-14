import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import classnames from 'classnames';

import { Delete } from '@redux/toast/actions';
import cls from './toast.module.scss';

/**
 *
 * @param {{toast:import('@redux/toast').Toast}} props
 * @returns
 */
const CustomToast = props => {
  const { toast } = props;
  const { id, type, content, ...restToastProps } = toast;
  const d = useDispatch();

  const handleClose = () => {
    d(Delete(toast.id));
  };

  return (
    <Toast className={classnames(cls.toastWrapper, { [cls[type]]: type })} onClose={handleClose} {...restToastProps}>
      <Toast.Header className={cls.header}>
        <strong className="mr-auto">{type}</strong>
      </Toast.Header>
      <Toast.Body className={cls.body}>{content}</Toast.Body>
    </Toast>
  );
};

CustomToast.propTypes = {
  toast: PropTypes.object.isRequired
};

export default CustomToast;
