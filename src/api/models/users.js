const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: {type: String, require: true },
    password: {type:String, require: true},
    rol: { type:String, require: true,
        enum: ["admin", "user"], default:"user"},
    imagen: {type: String, require: true },
    email: {type: String, require: true }
}, {
    timestamps: true,
    collection: "users"
});

// Encriptar la contraseña (bcrypt):
userSchema.pre("save", function() {
    this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("users", userSchema, "users");
module.exports = User;