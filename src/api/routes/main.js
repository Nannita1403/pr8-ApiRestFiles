// Nos traemos todas las rutas de index.js

const usersRoutes = require("./users");
const gamesRouter = require("./games");
const plataformRouter = require("./Platforms");

const mainRouter = require ("express").Router();

mainRouter.use("/users", usersRoutes);
mainRouter.use("/platform", plataformRouter);
mainRouter.use("/games", gamesRouter);


module.exports = mainRouter;