import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../../shared/Notifications';
import { GlobalStoreContext } from '../../shared/Globals';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../Authentication/UserProvider';

const BookForm = ({ endpoint, preload }) => {
  console.log(preload);
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);

  useEffect(() => {
    setInputs({ ...preload });
  }, [preload])

  const handleChange = event => {
    event.persist();
    console.log(inputs);
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
    console.log(inputs);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(inputs);

    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`, {
      ...inputs,
      secret_token: (user & user.token)
    })
      .then(({ data }) => {
        if (data) {
          setNotification({
            type: "success",
            message: "Book was Added successfully"
          });
        }

        setRedirect(true);
      })
      .catch((error) => {
        setNotification({
          type: "danger",
          message: `There was an error updating the book: ${error.message}`
        });
      });
  };

  if (redirect) return <Redirect to="/books" />;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Book Name</Form.Label>


        <Form.Control
          onChange={handleChange}
          name="Book Name"
          placeholder="Enter the book name"
          defaultValue={inputs.bookName}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Book Author</Form.Label>

        <Form.Control
          onChange={handleChange}
          name="Book Author"
          placeholder="Enter the name of author"
          defaultValue={inputs.bookAuthor}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Book Release Date</Form.Label>

        <Form.Control
          onChange={handleChange}
          name="Book Release Date"
          placeholder="Enter the book release date"
          defaultValue={inputs.bookReleaseDate}
        />
      </Form.Group>

      <Form.Group>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

export default BookForm;