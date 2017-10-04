const AuthController = require('./controllers/AuthController');
const AuthControllerPolicy = require('./policies/AuthControllerPolicy');
const SongsController = require('./controllers/SongsController');
const BookmarksController = require('./controllers/BookmarksController');
const HistoriesController = require('./controllers/HistoriesController');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
  app.post("/register", AuthControllerPolicy.register, AuthController.register);
  app.post("/login", AuthController.login);

  app.get("/songs", SongsController.index);
  app.get("/songs/:songId", SongsController.show);
  app.post("/songs", SongsController.post);
  app.put("/songs/:songId", SongsController.put);

  app.get("/bookmarks", isAuthenticated, BookmarksController.index);
  app.post("/bookmarks", isAuthenticated, BookmarksController.post);
  app.delete("/bookmarks/:bookmarkId", isAuthenticated, BookmarksController.remove);

  app.get("/histories", isAuthenticated, HistoriesController.index);
  app.post("/histories", isAuthenticated, HistoriesController.post);
};
