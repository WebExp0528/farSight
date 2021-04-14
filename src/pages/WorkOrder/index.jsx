import React from 'react';
import { RenderRoutes } from 'component';

const WorkOrder = ({ routes, match }) => {
  return (
    <div>
      <RenderRoutes routes={routes} />
    </div>
  );
};

export default WorkOrder;
