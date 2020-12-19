import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../shared/Header';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <>
      <Header title="Login Page">
        <p>
          User Can login into their account here.
        </p>
        
        
      </Header>
      
      <Container>
        <p>
Enter Your Email and Password here!         </p>
        
        <LoginForm/>
      </Container>
    </>
  );
}
 
export default Login;