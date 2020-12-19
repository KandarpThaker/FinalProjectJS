import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from './index';
import Edit from './Edit';
import New from './New'
import Destroy from './Destroy';
import Form from './Form';
import { UserContext } from '../Authentication/UserProvider';


const Routes = () => {
  const { user } = useContext(UserContext);
  return (
    <Switch>
      <Route exact path="/books" component={Index} />
      { user && user.token ? (
        <>

          <Route exact path="/books/edit/:id" component={Edit} />
          <Route exact path="/books/new" component={New} />
          <Route exact path="/books/destroy/:id" component={Destroy} />
          <Route exact path="/form" component={Form} />
        </>) : null}
    </Switch>
  );
}

export default Routes;