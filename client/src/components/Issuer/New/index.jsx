
import React from 'react';
import Form from '../Form';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';

const New = () => {
  //console.log("aghdfss")
  return (
    <>
      <Header title="Issuers">
        Hi I'm a man-child.
      </Header>
      <Container>
        <Form endpoint="issuers/new" />
      </Container>
    </>
  );
}

export default New;