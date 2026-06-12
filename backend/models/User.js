const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    name: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    securityQuestion: {
      type: String,
      required: true
    },

    securityAnswer: {
      type: String,
      required: true
    },

    customerStatus: {
      type: String,
      enum: ["Active", "Inactive", "Needs Follow Up"],
      default: "Active"
    },

    customerNotes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


