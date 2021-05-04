import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import './Sidebar.scss';

export const Sidebar = props => (
  <Menu>
    <a className="menu-item" href="/Createstatuscreen">
      Status Update
    </a>
    <a className="menu-item" href="/Photosscreen">
      Photosscreen
    </a>
    <a className="menu-item" href="/Submitworkorder">
      Submitworkorder
    </a>
  </Menu>
);

export default Sidebar;
