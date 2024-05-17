const mongoose = require("mongoose");

const singerSchema = new mongoose.Schema({
    name: {type: String, require: true },
    imagen: {type: String, require: true },
    songs: [{ type:mongoose.Types.ObjectId, ref:"songs", require: false}]
}, {
    timestamps: true,
    collection: "singers"
});

const Singer = mongoose.model("singers", singerSchema, "singers");
module.exports = Singer;