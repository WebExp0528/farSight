import React from 'react';
import { useRedux } from '@redux';
import CustomToast from 'component/Toast';

import cls from './toast-container.module.scss';

const ToastContainer = () => {
  const toastState = useRedux('toast');
  return (
    <div className={cls.box}>
      {toastState.map(toast => (
        <CustomToast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

ToastContainer.propTypes = {};

export default ToastContainer;
