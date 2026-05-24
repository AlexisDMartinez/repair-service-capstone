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
      .populate("service");

    const sortedBookings = bookings.sort((a, b) => {
      const statusOrder = {
        Cancelled: 2,
        "Time Change Requested": 1
      };

      const aOrder = statusOrder[a.status] || 0;
      const bOrder = statusOrder[b.status] || 0;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(sortedBookings);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load admin bookings"
    });
  }
});

// Admin: cancel customer booking
router.put("/admin/cancel/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "Cancelled"
      },
      {
        new: true
      }
    )
      .populate("user", "name email")
      .populate("service");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Unable to cancel booking"
    });
  }
});

// Admin: request customer time change
router.put(
  "/admin/request-time-change/:id",
  protect,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "Time Change Requested"
        },
        {
          new: true
        }
      )
        .populate("user", "name email")
        .populate("service");

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found"
        });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({
        message: "Unable to request time change"
      });
    }
  }
);

// Customer: cancel own booking
router.put("/cancel/:id", protect, cancelBooking);

// Customer: update own booking
router.put("/:id", protect, async (req, res) => {
  try {
    const { date, time, notes } = req.body;

    const existingBooking = await Booking.findOne({
      _id: { $ne: req.params.id },
      date,
      time,
      status: { $ne: "Cancelled" }
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This appointment time is already booked. Please select another time."
      });
    }

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

module.exports = router;
