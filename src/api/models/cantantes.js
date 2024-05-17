const mongoose = require("mongoose");

const cantanteSchema = new mongoose.Schema({
    name: {type: String, require: true },
    imagen: {type: String, require: true },
    games: [{ type:mongoose.Types.ObjectId, ref:"games", require: false}]
}, {
    timestamps: true,
    collection: "cantantes"
});

const Cantante = mongoose.model("cantantes", cantanteSchema, "cantantes");
module.exports = Cantante;