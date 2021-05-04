import React from 'react';
import { RenderRoutes } from 'components';

const WorkOrder = ({ routes }) => {
  return (
    <div>
      <RenderRoutes routes={routes} />
    </div>
  );
};

export default WorkOrder;
