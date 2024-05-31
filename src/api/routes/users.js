const { isAdmin } = require("../../middlewares/auth");
const { getUsers, registerUser, loginUser, deleteUser } = require("../controllers/users");
const usersRoutes = require("express").Router();

usersRoutes.get("/",(isAdmin), getUsers);
usersRoutes.post("/register", registerUser);
usersRoutes.post("/login", loginUser);
usersRoutes.delete("/:id",(isAdmin), deleteUser);


module.exports = usersRoutes;