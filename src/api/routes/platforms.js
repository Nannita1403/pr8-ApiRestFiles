const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {getPlatformById, getPlatforms, postPlatform, updatePlatform, deletePlatform } = require("../controllers/platforms");

const plataformRouter = require("express").Router();

plataformRouter.get("/:id", getPlatformById);
plataformRouter.get("/", getPlatforms);
plataformRouter.post("/",(isAdmin),upload.single("games"), postPlatform);
plataformRouter.put("/:id",(isAdmin),upload.single("games"), updatePlatform);
plataformRouter.delete("/:id",(isAdmin), deletePlatform);

module.exports = plataformRouter;
