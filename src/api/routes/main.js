// Nos traemos todas las rutas de index.js

const usersRoutes = require("./users");
const songsRouter = require("./songs");
const singerRouter = require("./singers");

const mainRouter = require ("express").Router();

mainRouter.use("/users", usersRoutes);
mainRouter.use("/singers", singerRouter);
mainRouter.use("/songs", songsRouter);


module.exports = mainRouter;