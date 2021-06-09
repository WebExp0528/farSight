import React from 'react';
import { RenderRoutes } from 'components';
import Layout from 'Layout';

import { usePhotoUpload } from 'hooks';

import Routes from './routes';

export const App = () => {
  usePhotoUpload();

  return (
    <Layout>
      <RenderRoutes routes={Routes} />
    </Layout>
  );
};

export default App;
