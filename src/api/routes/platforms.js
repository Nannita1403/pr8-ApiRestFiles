const { isAdmin } = require("../../middlewares/auth");
const {getPlatformById, getPlatforms, postPlatform, updatePlatform, deletePlatform } = require("../controllers/platforms");

const platformRouter = require("express").Router();

platformRouter.get("/:id", getPlatformById);
platformRouter.get("/", getPlatforms);
platformRouter.post("/",(isAdmin), postPlatform);
platformRouter.put("/:id",(isAdmin), updatePlatform);
platformRouter.delete("/:id",(isAdmin), deletePlatform);

module.exports = platformRouter;
