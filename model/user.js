const mongoose = require("mongoose");


console.log("user db.js");

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, default: null },
        last_name: { type: String, default: null },
        email: { type: String, unique: true },
        password: { type: String },
        token: { type: String },
    }
);

module.exports = mongoose.model("user", userSchema);