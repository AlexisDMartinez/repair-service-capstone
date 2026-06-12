const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const User = require("../models/User");
const Booking = require("../models/Booking");

router.get("/", protect, adminMiddleware, async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select("-password -securityAnswer")
      .sort({ createdAt: -1 });

    const customersWithBookings = await Promise.all(
      customers.map(async (customer) => {
        const bookings = await Booking.find({ user: customer._id })
          .populate("service")
          .sort({ createdAt: -1 });

        return {
          ...customer.toObject(),
          bookingCount: bookings.length,
          lastBooking: bookings[0] || null,
          bookings
        };
      })
    );

    res.json(customersWithBookings);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load customers",
      error: error.message
    });
  }
});

router.put("/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      customerStatus,
      customerNotes
    } = req.body;

    const updatedCustomer = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        phone,
        email: email.toLowerCase().trim(),
        customerStatus,
        customerNotes
      },
      { new: true }
    ).select("-password -securityAnswer");

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    await Booking.updateMany(
      { user: updatedCustomer._id },
      {
        customerName: updatedCustomer.name,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone
      }
    );

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update customer",
      error: error.message
    });
  }
});

module.exports = router;
