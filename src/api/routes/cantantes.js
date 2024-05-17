const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {getCantanteById, getCantantes, postCantante, updateCantante, deleteCantante } = require("../controllers/cantantes");

const cantanteRouter = require("express").Router();

cantanteRouter.get("/:id", getCantanteById);
cantanteRouter.get("/", getCantantes);
cantanteRouter.post("/",(isAdmin),upload.single("imagenDisco"), postCantante);
cantanteRouter.put("/:id",(isAdmin),upload.single("imageDisco"), updateCantante);
cantanteRouter.delete("/:id",(isAdmin), deleteCantante);

module.exports = cantanteRouter;
