const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    duration: String,
    priceEstimate: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
