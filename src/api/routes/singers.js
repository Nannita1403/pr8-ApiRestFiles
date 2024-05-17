const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {getSingerById, getSingers, postSinger, updateSinger, deleteSinger } = require("../controllers/singers");

const singerRouter = require("express").Router();

singerRouter.get("/:id", getSingerById);
singerRouter.get("/", getSingers);
singerRouter.post("/",(isAdmin),upload.single("music"), postSinger);
singerRouter.put("/:id",(isAdmin),upload.single("music"), updateSinger);
singerRouter.delete("/:id",(isAdmin), deleteSinger);

module.exports = singerRouter;
