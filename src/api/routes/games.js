const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getGames, getGameById, getGameByCategory, getGamesByPrice, getGameByAdmin, postGame, updateGame, deleteGame } = require("../controllers/games");

const gamesRouter = require("express").Router();

gamesRouter.get("/not-verified",(isAdmin), getGameByAdmin);
gamesRouter.get("/:id", getGameById);
gamesRouter.get("/category/:category", getGameByCategory);
gamesRouter.get("/Price/:precio", getGamesByPrice);
gamesRouter.get("/", getGames);
gamesRouter.post("/",(isAuth), postGame);
gamesRouter.put("/:id",(isAdmin), updateGame);
gamesRouter.delete("/:id",(isAdmin), deleteGame);





module.exports = gamesRouter;


            