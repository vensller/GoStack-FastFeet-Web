import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import RecipientRegister from '~/pages/RecipientRegister';
import RecipientList from '~/pages/RecipientList';
import DeliveryList from '~/pages/DeliveryList';

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
    </Switch>
  );
}
