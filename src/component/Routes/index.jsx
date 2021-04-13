import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import NotFoundPage from 'component/NotFound';

export const RenderRoutes = withRouter(({ routes, match }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        const { path = '', type = 'route', ...props } = route;
        if (type === 'route') {
          return <RouteWithSubRoutes key={i} path={path} {...props} />;
        } else if (type === 'redirect') {
          const newPath = match.path === '/' ? `/${path}` : `${match.path}/${path}`;
          return <Redirect key={i} to={newPath} {...props} />;
        }
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );
});

RenderRoutes.defaultProps = {
  routes: []
};

RenderRoutes.propTypes = {
  routes: PropTypes.object.isRequired
};

export const RouteWithSubRoutes = withRouter(({ path, routes, component: Component, match, ...rest }) => {
  const newPath = match.path === '/' ? `/${path}` : `${match.path}/${path}`;
  console.log('~~~~~ render routes', newPath, match, routes);
  return <Route path={newPath} render={props => <Component {...props} routes={routes} />} {...rest} />;
});

export default RenderRoutes;
