
import React from 'react';
import Form from '../Form';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';

const New = () => {
  //console.log("aghdfss")
  return (
    <>
      <Header title="Books">
        Hi I'm a man-child.
      </Header>
      <Container>
        <Form endpoint="books/new" />
      </Container>
    </>
  );
}

export default New;