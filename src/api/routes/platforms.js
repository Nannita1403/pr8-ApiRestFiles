const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {getPlatformById, getPlatforms, postPlatform, updatePlatform, deletePlatform } = require("../controllers/platforms");

const platformRouter = require("express").Router();

platformRouter.get("/:id", getPlatformById);
platformRouter.get("/", getPlatforms);
platformRouter.post("/",(isAdmin),upload.single("imagen"), postPlatform);
platformRouter.put("/:id",(isAdmin),upload.single("imagen"), updatePlatform);
platformRouter.delete("/:id",(isAdmin), deletePlatform);

module.exports = platformRouter;
