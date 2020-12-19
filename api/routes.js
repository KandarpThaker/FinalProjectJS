module.exports = router => {
  require('./routes/users')(router);
  require('./routes/sessions')(router);
  require('./routes/book')(router);
  require('./routes/issuer')(router);

  return router;
};