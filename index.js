require("dotenv").config();
const express = require("express");

const { connectDB } = require("./src/config/db");
const gamesRouter = require("./src/api/routes/games");
const platformRouter = require("./src/api/routes/platforms");
const usersRoutes = require("./src/api/routes/users");

const app = express();
app.use(express.json());

connectDB();
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/platforms", platformRouter);
app.use("/api/v1/games", gamesRouter);
app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})
app.listen(3000, () => {
    console.log("http://localhost:3000");
})