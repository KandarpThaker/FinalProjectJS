import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { GlobalStoreContext } from '../shared/Globals';
import { NotificationContext } from '../shared/Notifications';
import { Container, Table } from 'react-bootstrap';
import Header from '../shared/Header';

const Users = () => {
  const { globalStore } = useContext(GlobalStoreContext);
  const [users, setUsers] = useState([]);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/users`)
      .then(({ data }) => setUsers(data))
      .catch(error => {
        console.error(error.message);

        setNotification({
          type: "danger",
          message: "Couldn't access the users at this time."
        });
      });
  }, [globalStore, setNotification]);

  return (
    users ? (
      <>
        <Header title="Users List">
          <p>
            List of all the users are shown here!
          </p>


        </Header>

        <Container className="my-3">
          <Table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
              </tr>
            </thead>

            <tbody>
              {users.map(({ name, email }, i) => (
                <tr>
                  <td>{name}</td>
                  <td>{email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    ) : null
  );
}

export default Users;