const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getSongByAdmin, getSongById, getSongByCategory, getSongs, postSong, updateSong, deleteSong } = require("../controllers/Songs");

const songsRouter = require("express").Router();

songsRouter.get("/not-verified",(isAdmin), getSongByAdmin);
songsRouter.get("/:id", getSongById);
songsRouter.get("/category/:category", getSongByCategory);
songsRouter.get("/", getSongs);
songsRouter.post("/",(isAuth), upload.single("music"), postSong);
songsRouter.put("/:id",(isAdmin), upload.single("music"), updateSong);
songsRouter.delete("/:id",(isAdmin), deleteSong);


module.exports = songsRouter;


            