const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
    name: {type: String, require: true },
    imagen: {type: String, require: true },
    games: [{ type:mongoose.Types.ObjectId, ref:"games", require: false}]
}, {
    timestamps: true,
    collection: "plataforms"
});

const Platform = mongoose.model("platforms", platformSchema, "platforms");
module.exports = Platform;