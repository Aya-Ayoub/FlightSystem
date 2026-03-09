const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

//create Booking
exports.createBooking = async (req, res) => {
  try {
    const { flightId, numberOfSeats } = req.body;

    const flight = await Flight.findById(flightId);

    if (!flight)
      return res.status(404).json({ message: "Flight not found" });

    if (flight.availableSeats < numberOfSeats) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const totalPrice = numberOfSeats * flight.price;

    flight.availableSeats -= numberOfSeats;
    await flight.save();

    const booking = await Booking.create({
      user: req.user._id,
      flight: flight._id,
      numberOfSeats,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getUser Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("flight");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (booking.status === "canceled") {
      return res.status(400).json({ message: "Already canceled" });
    }

    const flight = await Flight.findById(booking.flight);

    flight.availableSeats += booking.numberOfSeats;
    await flight.save();

    booking.status = "canceled";
    await booking.save();

    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};