import RenderRoutes from 'component/Routes';
import React from 'react';

const Home = ({ routes }) => {
  console.log('~~~~~ routes', routes);
  return <RenderRoutes routes={routes} />;
};

export default Home;
