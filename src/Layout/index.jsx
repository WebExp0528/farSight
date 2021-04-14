import LayoutHeader from './LayoutHeader';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <LayoutHeader />
      {children}
    </div>
  );
};

export default Layout;
