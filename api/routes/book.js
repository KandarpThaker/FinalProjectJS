const { index, show, create, update, destroy } = require('../controllers/book');
const passport = require('passport');

module.exports = router => {
  router.get('/books', index);
  router.get('/books/:id', show);



  router.post('/books/new', passport.authenticate('jwt', { session: false }), create);

  // localhost:4000/quotes/update
  router.post('/books/update', passport.authenticate('jwt', { session: false }), update);

  // localhost:4000/quotes/destroy
  router.post('/books/destroy', passport.authenticate('jwt', { session: false }), destroy);
};