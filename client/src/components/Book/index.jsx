import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import Axios from 'axios';
import Header from '../shared/Header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { UserContext } from '../Authentication/UserProvider';

const Book = () => {
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const { user } = useContext(UserContext)
  const [book, setBook] = useState([]);

  useEffect(() => {
    if (!globalStore.REACT_APP_ENDPOINT) return;

    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/books`)
      .then(({ data }) => {
        setBook(data);
      })
      .catch(error => {
        setNotification({
          type: "danger",
          message: `There was an error retrieving the book: ${error.message}`
        });
      });
  }, [globalStore, setNotification]);

  return (
    <>
      <Header title="Books" />

      <Container>
        {book && book.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <th>Book Name</th>
              <th>Book Author</th>
              <th>Book Release Date</th>
              <th>Edit/Delete</th>
            </thead>


            <tbody>
              {book.map((book, i) => (
                <tr key={i}>
                  <td id="bookName">
                    {book.bookName}
                  </td>

                  <td id="bookAuthor">
                    {book.bookAuthor}
                  </td>
                  <td id="bookReleaseDate">
                    {book.bookReleaseDate}
                  </td>

                  {user && user.token ? (
                    <td>
                      <Link to={`books/edit/${book._id}`}>
                        edit
                    </Link>
                    &nbsp;|&nbsp;
                      <Link to={`books/destroy/${book._id}`}>
                        delete
                    </Link>
                    </td>
                  ) : (<td></td>)}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
        <button> <Link to={`books/new`}> Add Book</Link></button>
      </Container>
    </>
  );
}

export default Book;

// import React, { useContext, useState, useEffect } from 'react';
// import { NotificationContext } from '../shared/Notifications';
// import { GlobalStoreContext } from '../shared/Globals';
// import { UserContext } from '../Authentication/UserProvider';
// import Axios from 'axios';
// import Header from '../shared/Header';
// import { Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Book = () => {
//   const { setNotification } = useContext(NotificationContext);
//   const { globalStore } = useContext(GlobalStoreContext);
//   const { user } = useContext(UserContext);

//   const [books, setBook] = useState([]);

//   useEffect(() => {
//     Axios.get(`${globalStore.REACT_APP_ENDPOINT}/books`)
//     .then(({ data }) => {
//       setBook(data);
//     })
//     .catch(error => {
//       setNotification({
//         type: "danger",
//         message: `There was an error retrieving the quotes: ${error.message}`
//       });
//     });
//   }, [globalStore, setNotification]);

//   return (
//     <>
//       <Header title="Books"/>

//       <Container>
//         {books && books.length > 0 ? (
//           books.map((bk, i) => (
//             <>
//               <blockquote>
//                 {bk.bookName}: "{bk.bookAuthor}" ~ {bk.bookReleaseDate}
//               </blockquote>

//               {user && user.token ? (
//                 <Link to={`/books/edit/${book._id}`}>...edit...</Link>
//               ) : null}
//             </>
//           ))
//         ) : null}
//       </Container>
//     </>
//   );
// }

// export default Book;