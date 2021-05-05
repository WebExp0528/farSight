import React from 'react';
import { RenderRoutes } from 'components';
import Routes from './routes';
import Layout from 'Layout';

export const App = () => {
  return (
    <Layout>
      <RenderRoutes routes={Routes} />
    </Layout>
  );
};

export default App;
