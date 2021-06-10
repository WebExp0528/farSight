import LayoutHeader from './LayoutHeader';
import React from 'react';
import { usePhotoUpload } from 'hooks/usePhotoUpload';

const Layout = ({ children }) => {
  usePhotoUpload();
  return (
    <div>
      <LayoutHeader />
      {children}
    </div>
  );
};

export default Layout;
