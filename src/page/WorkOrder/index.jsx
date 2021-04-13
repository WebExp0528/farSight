import React from 'react';
import { RenderRoutes } from 'component';

const WorkOrder = ({ routes, match }) => {
  console.log('~~~~~ home routes', match.path, routes);
  return (
    <div>
      This is Home Page
      <RenderRoutes routes={routes} />
    </div>
  );
};

export default WorkOrder;
