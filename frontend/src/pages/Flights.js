import { useState } from "react";
import { searchFlights, createBooking } from "../services/api";
import FlightCard from "../components/FlightCard";

function Flights() {

  const [flights, setFlights] = useState([]);
  const [query, setQuery] = useState({ from: "", to: "", date: "" });

  const search = async () => {
    const data = await searchFlights(query);
    setFlights(data);
  };

  const bookFlight = async (flightId) => {

    const seats = prompt("Number of seats:");

    await createBooking({
      flightId: flightId,
      numberOfSeats: seats
    });

    alert("Booking successful");

  };

  return (
    <div>

      <h2>Search Flights</h2>

      <input
        placeholder="From"
        onChange={(e) => setQuery({ ...query, from: e.target.value })}
      />

      <input
        placeholder="To"
        onChange={(e) => setQuery({ ...query, to: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setQuery({ ...query, date: e.target.value })}
      />

      <button onClick={search}>Search</button>

      <div>

        {flights.map((flight) => (
          <FlightCard
            key={flight._id}
            flight={flight}
            onBook={bookFlight}
          />
        ))}

      </div>

    </div>
  );
}

export default Flights;