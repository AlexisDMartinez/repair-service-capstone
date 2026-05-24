const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { service, date, time, email, phone, notes } = req.body;

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
      user: req.user.id,
      service,
      date,
      time,
      email,
      phone,
      notes
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Booking failed"
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    }).populate("service");

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