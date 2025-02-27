const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  codelink: { type: String, required: true },
  livelink: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
