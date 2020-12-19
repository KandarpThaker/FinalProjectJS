import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from './index';
import Edit from './Edit';
import New from './New'
import Destroy from './Destroy';
import Form from './Form';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/issuer" component={Index} />
      <Route exact path="/issuer/edit/:id" component={Edit} />
      <Route exact path="/issuer/new" component={New} />
      <Route exact path="/issuer/destroy/:id" component={Destroy} />
      <Route exact path="/form" component={Form} />
    </Switch>
  );
}

export default Routes;