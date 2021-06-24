import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import classNames from 'classnames';

import cls from './button-loading.module.scss';

const ButtonLoading = ({ children, isLoading = false, loaderMessage = '', size = null, ...props }) => {
  return (
    <Button
      className={classNames(cls.btnBase, { [cls.loading]: isLoading })}
      disabled={isLoading}
      size={size}
      {...props}
    >
      {isLoading && (
        <div className={cls.loader}>
          <Spinner as="span" animation="border" size={'sm'} role="status" aria-hidden="true" />
          {loaderMessage}
        </div>
      )}
      <div>{children}</div>
    </Button>
  );
};

export default ButtonLoading;
