const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = mongoose.model("Url", new Schema({
  url: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
}, { timestamps: true }));
