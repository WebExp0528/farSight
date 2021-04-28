import React from 'react';
import { RenderRoutes } from 'component';

const WorkOrder = ({ routes }) => {
  return (
    <div>
      <RenderRoutes routes={routes} />
    </div>
  );
};

export default WorkOrder;
