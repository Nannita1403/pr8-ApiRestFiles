const mongoose = require("mongoose");

const connectDB= async () => {
try {
    //en esta linea por mongoose me conecto a la BBDD
    await mongoose.connect(process.env.DB_URL);
    console.log("BBDD echando humo");
} catch (error) {
    console.log("Error conectando con la BBDD");
}
}

module.exports= {connectDB};