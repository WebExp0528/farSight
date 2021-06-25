import LayoutHeader from './LayoutHeader';
import React from 'react';
import { usePhotoUpload } from 'hooks/usePhotoUpload';

import cls from './layout.module.scss';

const Layout = ({ children }) => {
  usePhotoUpload();
  return (
    <React.Fragment>
      <LayoutHeader />
      <div className={cls.content}>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
