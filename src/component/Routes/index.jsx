import React from 'react';
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
          return <Redirect key={i} to={`${match.path}/${path}`} {...props} />;
        }
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );
});

export const RouteWithSubRoutes = withRouter(({ path, routes, component: Component, match, ...rest }) => (
  <Route path={`${match.path}/${path}`} render={props => <Component {...props} routes={routes} />} {...rest} />
));

export default RenderRoutes;
