import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';

import { genRandomCode } from 'helpers';

const RouteWithSubRoutes = ({ path, routes = [], component: Component, match, parentKey, ...rest }) => {
  routes = routes.map(item => {
    item.key = `${_.snakeCase(parentKey)}_${_.snakeCase(item.key)}`;
    return item;
  });
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
          return <RouteWithSubRoutes key={_.snakeCase(key)} parentKey={key} path={newPath} {...props} />;
        } else if (type === 'redirect') {
          return <Redirect key={_.snakeCase(key)} to={newPath} {...props} />;
        }
      })}
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired
};

export default withRouter(RenderRoutes);
