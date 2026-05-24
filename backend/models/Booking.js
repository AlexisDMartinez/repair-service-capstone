const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    date: String,

    time: String,

    notes: String,

    status: {
      type: String,
      default: "Scheduled"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

