import React from 'react';
import { RenderRoutes } from 'components';
import Layout from 'Layout';
import Routes from './routes';

export const App = () => {
  return (
    <Layout>
      <RenderRoutes routes={Routes} />
    </Layout>
  );
};

export default App;
