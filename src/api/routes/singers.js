const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {getSingerById, getSingers, postSinger, updateSinger, deleteSinger } = require("../controllers/singers");

const singerRouter = require("express").Router();

singerRouter.get("/:id", getSingerById);
singerRouter.get("/", getSingers);
singerRouter.post("/",(isAdmin),upload.single("imagenDisco"), postSinger);
singerRouter.put("/:id",(isAdmin),upload.single("imageDisco"), updateSinger);
singerRouter.delete("/:id",(isAdmin), deleteSinger);

module.exports = singerRouter;
