const AuthController = require('./controllers/AuthController');
const AuthControllerPolicy = require('./policies/AuthControllerPolicy');
const SongsController = require('./controllers/SongsController');

module.exports = (app) => {
  app.post("/register", AuthControllerPolicy.register, AuthController.register);
  app.post("/login", AuthController.login);

  app.get("/songs", SongsController.index);
  app.get("/songs/:songId", SongsController.show);
  app.post("/songs", SongsController.post);
};
