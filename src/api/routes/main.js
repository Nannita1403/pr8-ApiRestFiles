// Nos traemos todas las rutas de index.js

const gamesRouter = require("./games");
const platformRouter = require("./platforms");
const usersRoutes = require("./users");

const mainRouter = require ("express").Router();

mainRouter.use("/users", usersRoutes);
mainRouter.use("/platforms", platformRouter);
mainRouter.use("/games", gamesRouter);


module.exports = mainRouter;