import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';

import { genRandomCode } from 'helpers';

const RouteWithSubRoutes = ({ path, routes = [], parentKey, component: Component, match, ...rest }) => {
  const newRoutes = _.cloneDeep(routes).map(item => {
    item.key = `${_.snakeCase(parentKey)}_${_.snakeCase(item.key)}`;
    return item;
  });
  return <Route path={path} render={props => <Component {...props} routes={newRoutes} />} {...rest} />;
};

const RenderRoutes = props => {
  const { routes = [], match } = props;
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

        return <></>;
      })}
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired
};

export default withRouter(RenderRoutes);
