import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import Axios from 'axios';
import Header from '../shared/Header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Issuer = () => {
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);

  const [issuer, setIssuer] = useState([]);

  useEffect(() => {
    if (!globalStore.REACT_APP_ENDPOINT) return;

    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/issuers`)
      .then(({ data }) => {
        setIssuer(data);
      })
      .catch(error => {
        setNotification({
          type: "danger",
          message: `There was an error retrieving the issuer: ${error.message}`
        });
      });
  }, [globalStore, setNotification]);

  return (
    <>
      <Header title="Issuer" />

      <Container>
        {issuer && issuer.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <th>Book Issued</th>
              <th>Issuer Name</th>
              <th>Issuer Date Of Birth</th>
              <th>Issuer Address</th>
              <th>Edit/Delete</th>
            </thead>


            <tbody>
              {issuer.map((issuer, i) => (
                <tr key={i}>
                  <td>
                    {issuer.bookIssue}
                  </td>
                  <td>
                    {issuer.issueName}
                  </td>
                  <td>
                    {issuer.issueDoB}
                  </td>
                  <td>
                    {issuer.issueAddress}
                  </td>
                  <td>
                    <Link to={`issuer/edit/${issuer._id}`}>
                      edit
                    </Link>
                    &nbsp;|&nbsp;
                    <Link to={`issuer/destroy/${issuer._id}`}>
                      delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
        <button> <Link to={`issuer/new`}> Issue Book</Link></button>
      </Container>

    </>
  );
}

export default Issuer;