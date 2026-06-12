const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const Booking = require("../models/Booking");
const User = require("../models/User");

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

    res.json(bookings.map((booking) => booking._id));
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
      .populate("user", "firstName lastName name email phone")
      .populate("service");

    const sortedBookings = bookings.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(sortedBookings);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load admin bookings"
    });
  }
});

// Admin: create booking for customer
router.post("/admin/create", protect, adminMiddleware, async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      email,
      phone,
      serviceName,
      date,
      time,
      notes
    } = req.body;

    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" }
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This appointment time is already booked."
      });
    }

    let customer = null;

    if (customerId) {
      customer = await User.findById(customerId);
    }

    if (!customer && email) {
      customer = await User.findOne({
        email: email.toLowerCase().trim()
      });
    }

    if (!customer) {
      return res.status(404).json({
        message: "Customer account not found. Please select an existing customer."
      });
    }

    const booking = await Booking.create({
      user: customer._id,
      service: null,
      customerName:
        customer.name ||
        `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
        customerName,
      email: customer.email,
      phone: customer.phone || phone,
      serviceName,
      date,
      time,
      notes,
      status: "Scheduled"
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "firstName lastName name email phone")
      .populate("service");

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create admin booking",
      error: error.message
    });
  }
});

// Admin: update booking status
router.put("/admin/status/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Scheduled",
      "Confirmed",
      "Declined",
      "Contact Customer",
      "Cancelled",
      "Time Change Requested"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status."
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "firstName lastName name email phone")
      .populate("service");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update booking status"
    });
  }
});

// Admin: cancel customer booking
router.put("/admin/cancel/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    )
      .populate("user", "firstName lastName name email phone")
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
        { status: "Time Change Requested" },
        { new: true }
      )
        .populate("user", "firstName lastName name email phone")
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
        message:
          "This appointment time is already booked. Please select another time."
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
        notes,
        status: "Scheduled"
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