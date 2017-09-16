const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = mongoose.model("Url", new Schema({
  url: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
}, { timestamps: true }));
