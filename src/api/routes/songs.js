const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getSongByAdmin, getSongById, getSongByCategory, getSongsByPrice, getSongs, postSong, updateSong, deleteSong } = require("../controllers/Songs");

const songsRouter = require("express").Router();

songsRouter.get("/not-verified",(isAdmin), getSongByAdmin);
songsRouter.get("/:id", getSongById);
songsRouter.get("/category/:category", getSongByCategory);
songsRouter.get("/Price/:precio", getSongsByPrice);
songsRouter.get("/", getSongs);
songsRouter.post("/",(isAuth), upload.single("imagenDisco"), postSong);
songsRouter.put("/:id",(isAdmin), upload.single("imagenDisco"), updateSong);
songsRouter.delete("/:id",(isAdmin), deleteSong);


module.exports = songsRouter;


            