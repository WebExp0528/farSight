import React from 'react';
import { RenderRoutes } from 'component';
import Routes from './routes';
import Layout from 'Layout';

export const App = props => {
  return (
    <Layout>
      <RenderRoutes routes={Routes} />
    </Layout>
  );
};

export default App;
