require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/api/routes/main");
const multer =require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(express.json());
connectDB();
app.use("/api/v1", mainRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})
app.listen(3000, () => {
    console.log(" Servidor es http://localhost:3000");
})