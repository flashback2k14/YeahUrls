const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = mongoose.model("Tag", new Schema({
  name: String
}, { timestamps: true }));
