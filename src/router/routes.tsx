import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { ArronaxApp } from '../containers/App';
import Layout from '../components/Layout';

export const defaultPath = '/tezos/mainnet/blocks';
export const reQuery = /^\?e=\w+(|%20)\w+\/\w+&q=\w+/;

const QuerySupport = () => {
  const location = useLocation();

  if (reQuery.test(location.search)) {
    return <Route component={ArronaxApp} />;
  }

  return <Redirect to={defaultPath} />;
};

export default () => {
  const routes = [
    '/:platform/:network/:entity/:id',
    '/:platform/:network/:entity/query/:id',
    '/:platform/:network/:entity',
  ];

  return (
    <Switch>
      <Layout>
        <Route exact path={routes} component={ArronaxApp} />
        <QuerySupport />
        <Route exact path="/">
          <Redirect to={defaultPath} />
        </Route>
        <Redirect to="/" />
      </Layout>
    </Switch>
  );
};
