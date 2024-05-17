const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
    nombre: {type: String, require: true },
    imagen: {type: String, require: true },
    price: {type: Number, require: true },
    category: {
        type:String, 
        require: true, 
        enum: [
            "accion", 
            "aventura", 
            "conduccion", 
            "deporte", 
            "estrategia", 
            "simulacion",
        ],
    },
    verified: {type:Boolean, require:true, default:false}
}, {
    timestamps: true,
    collection: "games"
});

const Game = mongoose.model("games", gameSchema, "games");
module.exports = Game;