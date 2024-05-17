const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getGames, getGameById, getGameByCategory, getGamesByPrice, getGameByAdmin, postGame, updateGame, deleteGame } = require("../controllers/games");

const gamesRouter = require("express").Router();

gamesRouter.get("/not-verified",(isAdmin), getGameByAdmin);
gamesRouter.get("/:id", getGameById);
gamesRouter.get("/category/:category", getGameByCategory);
gamesRouter.get("/Price/:precio", getGamesByPrice);
gamesRouter.get("/", getGames);
gamesRouter.post("/",(isAuth), upload.single("imagen"), postGame);
gamesRouter.put("/:id",(isAdmin), upload.single("imagen"), updateGame);
gamesRouter.delete("/:id",(isAdmin), deleteGame);





module.exports = gamesRouter;


            