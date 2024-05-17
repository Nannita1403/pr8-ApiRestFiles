// Nos traemos todas las rutas de index.js

const cantanteRouter = require("./cantantes");
const usersRoutes = require("./users");
const songsRouter = require("./songs");

const mainRouter = require ("express").Router();

mainRouter.use("/users", usersRoutes);
mainRouter.use("/cantantes", cantanteRouter);
mainRouter.use("/songs", songsRouter);


module.exports = mainRouter;