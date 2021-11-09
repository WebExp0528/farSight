import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withRouter, matchPath } from 'react-router';
import _ from 'lodash';
import Routes from 'pages/routes';

const findRoute = (currentPath, parentPath = '', routes = []) => {
  let breadCrumb = [];
  routes.forEach(({ key, path, type, routes: subRoutes, ...rest }) => {
    if (type === 'redirect') {
      return;
    }
    const calcPath = `${parentPath}/${path}`;

    const match = matchPath(currentPath, {
      path: calcPath,
      ...rest
    });

    if (!match) {
      return;
    }

    if (match) {
      breadCrumb = [...breadCrumb, { key, path: match.url }];
    }

    if (subRoutes) {
      const subBreadCrumb = findRoute(currentPath, calcPath, subRoutes);
      breadCrumb = [...breadCrumb, ...subBreadCrumb];
      return;
    }
  });

  return [...breadCrumb];
};

const BreadCrumb = ({ location }) => {
  const breadCrumbs = _.uniq((findRoute(location.pathname, '', Routes) || []).map(({ path }) => path));

  const path = breadCrumbs[breadCrumbs.length - 2];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <NavLink to="/">
        <Button variant="primary" size="lg" style={{ fontSize: '1rem' }}>
          <FontAwesomeIcon icon={['fas', 'home']} size="lg" />
        </Button>
      </NavLink>
      &nbsp;
      {path && (
        <NavLink to={path}>
          <Button variant="primary" size="lg" style={{ fontSize: '1rem' }}>
            <FontAwesomeIcon icon={['fas', 'arrow-alt-circle-left']} size="lg" />
          </Button>
        </NavLink>
      )}
    </div>
  );
};

export default withRouter(BreadCrumb);
