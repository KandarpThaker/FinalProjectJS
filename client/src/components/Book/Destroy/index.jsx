import Axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { GlobalStoreContext } from '../../shared/Globals';
import { NotificationContext } from '../../shared/Notifications';
import { UserContext } from '../../Authentication/UserProvider';

const Destroy = () => {
  const { id } = useParams();
  const { globalStore } = useContext(GlobalStoreContext);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/books/destroy`, { _id: id, secret_token: (user && user.token) })
      .then(() => {
        setNotification(`Music was destroyed successfully.`);
      })
      .catch(error => {
        setNotification(`Couldn't destroy the selected book due to an error: ${error.message}`);
      });
  }, [globalStore, id, user, setNotification]);

  return <Redirect to="/books" />;
}

export default Destroy;