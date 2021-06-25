import LayoutHeader from './LayoutHeader';
import React from 'react';
import { usePhotoUpload } from 'hooks/usePhotoUpload';

const Layout = ({ children }) => {
  usePhotoUpload();
  return (
    <React.Fragment>
      <LayoutHeader />
      {children}
    </React.Fragment>
  );
};

export default Layout;
