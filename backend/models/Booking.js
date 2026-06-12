const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null
    },

    serviceName: {
      type: String,
      default: ""
    },

    customerName: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    notes: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Scheduled"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

