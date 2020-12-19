import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../../shared/Notifications';
import { GlobalStoreContext } from '../../shared/Globals';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../Authentication/UserProvider';

const IssuerForm = ({ endpoint, preload }) => {
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
            message: "Issuer was Added successfully"
          });
        }

        setRedirect(true);
      })
      .catch((error) => {
        setNotification({
          type: "danger",
          message: `There was an error updating the issuer: ${error.message}`
        });
      });
  };

  if (redirect) return <Redirect to="/issuer" />;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label> Book Issued</Form.Label>

      <Form.Group>
        <Form.Control
          onChange={handleChange}
          name="Book Issued"
          placeholder="Enter book issued"
          defaultValue={inputs.bookIssue}
        />
      </Form.Group>

      <Form.Label>Issuer Name</Form.Label>

      <Form.Group>
        <Form.Control
          onChange={handleChange}
          name="Issuer Name"
          placeholder="Enter the issuer name"
          defaultValue={inputs.issueName}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Issuer Date Of Birth</Form.Label>

        <Form.Control
          onChange={handleChange}
          name="Issuer Date Of Birth"
          placeholder="Enter the issuer's date of birth"
          defaultValue={inputs.issueDoB}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Issuer Address</Form.Label>

        <Form.Control
          onChange={handleChange}
          name="Issuer Address"
          placeholder="Enter the issuer address"
          defaultValue={inputs.issueAddress}
        />
      </Form.Group>

      <Form.Group>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

export default IssuerForm;