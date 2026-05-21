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
// Update booking
router.put("/:id", authMiddleware, async (req, res) => {
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
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Unable to update booking" });
  }
});

// Cancel booking
router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        status: "Cancelled"
      },
      {
        new: true
      }
    ).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Unable to cancel booking" });
  }
});
