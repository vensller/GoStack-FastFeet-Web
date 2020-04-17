import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

// Query pages
import RecipientList from '~/pages/RecipientList';
import DeliveryList from '~/pages/DeliveryList';
import DeliverymanList from '~/pages/DeliverymanList';
import ProblemList from '~/pages/ProblemList';

// Register pages
import RecipientRegister from '~/pages/RecipientRegister';
import DeliverymanRegister from '~/pages/DeliverymanRegister';
import DeliveryRegister from '~/pages/DeliveryRegister';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/recipients" exact component={RecipientList} isPrivate />
      <Route
        path="/recipients/register"
        exact
        component={RecipientRegister}
        isPrivate
      />

      <Route path="/deliveries" exact component={DeliveryList} isPrivate />
      <Route
        path="/deliveries/register"
        exact
        component={DeliveryRegister}
        isPrivate
      />

      <Route path="/couriers" exact component={DeliverymanList} isPrivate />
      <Route
        path="/couriers/register"
        component={DeliverymanRegister}
        isPrivate
      />

      <Route path="/problems" exact component={ProblemList} isPrivate />
    </Switch>
  );
}
