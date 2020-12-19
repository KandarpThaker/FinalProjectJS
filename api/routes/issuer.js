const { index, show, create, update, destroy } = require('../controllers/issuer');

module.exports = (router) => {
  router.get('/issuers', index);
  router.get('/issuers/:id', show);
  router.post('/issuers/new', create);
  router.post('/issuers/update', update);
  router.post('/issuers/destroy', destroy);
  return router;
};