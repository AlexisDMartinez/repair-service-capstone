const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user.id,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("service");
  res.json(bookings);
};

const cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "Cancelled" },
    { new: true }
  );

  res.json(booking);
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
};
