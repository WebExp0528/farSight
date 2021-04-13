import React from 'react';
import { RenderRoutes, Layout } from 'component';
import Routes from './routes';

export const App = props => {
  return (
    <Layout>
      <RenderRoutes routes={Routes} />
    </Layout>
  );
};

export default App;
