const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const Booking = require("../models/Booking");

const {
  createBooking,
  getMyBookings,
  cancelBooking
} = require("../controllers/bookingController");

// Create booking
router.post("/", protect, createBooking);

// Get logged-in user's bookings
router.get("/my-bookings", protect, getMyBookings);

// Get booked dates that reached daily capacity
router.get("/fully-booked/dates", async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $match: {
          status: { $ne: "Cancelled" }
        }
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gte: 5 }
        }
      }
    ]);

    const fullyBookedDates = bookings.map((booking) => booking._id);

    res.json(fullyBookedDates);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load fully booked dates"
    });
  }
});

// Admin: get all bookings
router.get("/admin/all", protect, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("service")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load admin bookings"
    });
  }
});

// Update booking
router.put("/:id", protect, async (req, res) => {
  try {
    const { date, time, notes } = req.body;

    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        date,
        time,
        notes
      },
      {
        new: true
      }
    ).populate("service");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update booking"
    });
  }
});

// Cancel booking
router.put("/cancel/:id", protect, cancelBooking);

module.exports = router;
