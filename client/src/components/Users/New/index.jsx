import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../shared/Header';
import UserForm from '../UserForm';

const New = () => {
  return (
    <>
      <Header title="Register User">
        <p>
          If you are not registered! please register here to login!
        </p>


      </Header>

      <Container>
        <p>
          <strong>Please enter your credentials here to Registed!</strong>
        </p>

        <UserForm endpoint="users" />
      </Container>
    </>
  );
}

export default New;