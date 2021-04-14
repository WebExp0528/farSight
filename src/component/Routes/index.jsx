import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { genRandomCode } from 'utils';

const RouteWithSubRoutes = ({ path, routes, component: Component, match, ...rest }) => {
  return <Route path={path} render={props => <Component {...props} routes={routes} />} {...rest} />;
};

export const RenderRoutes = props => {
  const { routes, match } = props;
  return (
    <Switch>
      {routes.map((route, i) => {
        const { key = genRandomCode(), path = '', type = 'route', ...props } = route;
        const newPath = match.path === '/' ? `/${path}` : `${match.path}/${path}`;
        if (type === 'route') {
          return <RouteWithSubRoutes key={key} path={newPath} {...props} />;
        } else if (type === 'redirect') {
          return <Redirect key={`${path}-${i}`} to={newPath} {...props} />;
        }
      })}
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired
};

export default withRouter(RenderRoutes);
