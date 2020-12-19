import React from 'react';
import PageRoutes from '../../Pages/routes';
import UserRoutes from '../../Users/routes';
import AuthenticationRoutes from '../../Authentication/routes';
import BookRoutes from '../../Book/routes'
import IssuerRoutes from '../../Issuer/routes'

const Routes = () => {
  return (
    <>
      <PageRoutes />
      <UserRoutes />
      <AuthenticationRoutes />
      <BookRoutes />
      <IssuerRoutes />
    </>
  );
}

export default Routes;