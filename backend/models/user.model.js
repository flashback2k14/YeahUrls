const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = mongoose.model("User", new Schema({
  name: String,
  passwordHash: String,
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true }));
