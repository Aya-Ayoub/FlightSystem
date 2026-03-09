function FlightCard({ flight, onBook }) {

  return (
    <div style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

      <h3>{flight.flightNumber}</h3>

      <p>{flight.from} → {flight.to}</p>

      <p>Date: {flight.date}</p>

      <p>Available Seats: {flight.availableSeats}</p>

      <button onClick={() => onBook(flight._id)}>
        Book Seats
      </button>

    </div>
  );

}

export default FlightCard;