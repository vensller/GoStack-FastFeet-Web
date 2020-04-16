import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

// Query pages
import RecipientList from '~/pages/RecipientList';
import DeliveryList from '~/pages/DeliveryList';
import DeliverymanList from '~/pages/DeliverymanList';

// Register pages
import RecipientRegister from '~/pages/RecipientRegister';
import DeliverymanRegister from '~/pages/DeliverymanRegister';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path="/recipients/register"
        component={RecipientRegister}
        isPrivate
      />
      <Route path="/recipients" component={RecipientList} isPrivate />

      <Route path="/deliveries" component={DeliveryList} isPrivate />

      <Route path="/couriers" component={DeliverymanList} isPrivate />
      <Route
        path="/couriers/register"
        component={DeliverymanRegister}
        isPrivate
      />
    </Switch>
  );
}
