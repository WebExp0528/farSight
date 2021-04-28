import * as React from 'react';
import classnames from 'classnames';
import { Spinner } from 'react-bootstrap';

import cls from './content-loader.module.scss';

const ContentLoader = ({ className = null, children = null, asOverlay = false, ...rest }) => (
  <div
    className={classnames(cls.loader, className, {
      [cls.asOverlay]: asOverlay
    })}
    {...rest}
  >
    <Spinner animation="border" variant="secondary" />
    {children && <div className={cls.content}>{children}</div>}
  </div>
);

export default ContentLoader;
