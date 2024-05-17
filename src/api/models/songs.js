const mongoose = require("mongoose");


const songSchema = new mongoose.Schema({
    nombre: {type: String, require: true },
    imagen: {type: String, require: true },
    category: {
        type:String, 
        require: true, 
        enum: [
            "rap", 
            "rock", 
            "pop", 
            "melodico", 
            "reggueton", 
            "reggae",
        ],
    },
    verified: {type:Boolean, require:true, default:false}
}, {
    timestamps: true,
    collection: "songs"
});

const Song = mongoose.model("songs", songSchema, "songs");
module.exports = Song;