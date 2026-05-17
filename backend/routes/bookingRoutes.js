const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getMyBookings,
  cancelBooking
} = require("../controllers/bookingController");

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.put("/cancel/:id", protect, cancelBooking);

module.exports = router;
