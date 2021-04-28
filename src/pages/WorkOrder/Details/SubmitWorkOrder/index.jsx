import React from 'react';
import BasicSurvey from './BasicSurvey';
import PoolSurvey from './PoolSurvey';
import FinalCheckSurvey from './FinalCheckSurvey';
import { useRedux } from '@redux';

export const SubmitWorkOrder = props => {
  const { surveyName } = props?.match?.params || {};
  const wonState = useRedux('workOrderDetail');
  const { data: won = {} } = wonState;

  switch (surveyName) {
    case 'final':
      return <FinalCheckSurvey won={won} />;
    case 'NS_FSAPI_Pool_Beta-v1':
      return <PoolSurvey won={won} />;
    case 'FarSightBasic':
    default:
      return <BasicSurvey won={won} />;
  }
};

export default SubmitWorkOrder;
