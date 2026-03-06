const Flight = require("../models/Flight");

//create flight
exports.createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      from,
      to,
      date,
      totalSeats,
      price,
    } = req.body;

    const flight = await Flight.create({
      flightNumber,
      from,
      to,
      date,
      totalSeats,
      availableSeats: totalSeats,
      price,
    });

    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a Flight
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight)
      return res.status(404).json({ message: "Flight not found" });

    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Flight
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!flight)
      return res.status(404).json({ message: "Flight not found" });

    res.json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete Flight
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight)
      return res.status(404).json({ message: "Flight not found" });

    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search flights
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const filter = {};

    if (from) filter.from = from;
    if (to) filter.to = to;
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      filter.date = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    const flights = await Flight.find(filter);

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};