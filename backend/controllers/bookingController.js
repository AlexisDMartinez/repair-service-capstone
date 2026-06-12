const Booking = require("../models/Booking");
const User = require("../models/User");

const createBooking = async (req, res) => {
  try {
    const { service, date, time, notes } = req.body;

    const customer = await User.findById(req.user.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer account not found"
      });
    }

    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" }
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This appointment time is already booked. Please select another time."
      });
    }

    const booking = await Booking.create({
      user: customer._id,
      service,
      customerName: customer.name || `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      phone: customer.phone,
      date,
      time,
      notes,
      status: "Scheduled"
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    }).populate("service");

    const sortedBookings = bookings.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);

      return aDateTime - bDateTime;
    });

    res.json(sortedBookings);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load bookings"
    });
  }
};

const cancelBooking = async (req, res) => {
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
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
};