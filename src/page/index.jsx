import React from 'react';
import { LayoutHeader, RenderRoutes } from 'component';
import Routes from './routes';

export const App = props => {
  //TODO: Update folder structure.  Create "components" and "pages" folders.
  //Only Component Folders (containing a single component definition) should start with upper case
  //REcommended folders to add (perhaps):
  //containers, models, constants, pages, forms, etc.
  //TODO: Move divs to Layout Component (research)
  //TODO: Move NavBar into a new Content Component (as stateless Functional Component)
  return (
    <div>
      <LayoutHeader />
      <RenderRoutes routes={Routes} />
    </div>
  );
};

export default App;
