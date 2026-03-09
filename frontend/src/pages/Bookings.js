import { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../services/api";

function Bookings() {

  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancel = async (id) => {

    await cancelBooking(id);

    alert("Booking canceled");

    loadBookings();
  };

  return (
    <div>

      <h2>My Bookings</h2>

      {bookings.map((b) => (

        <div key={b._id} style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

          <p>Flight: {b.flight.flightNumber}</p>

          <p>Seats: {b.numberOfSeats}</p>

          <p>Status: {b.status}</p>

          {b.status !== "canceled" && (
            <button onClick={() => cancel(b._id)}>
                Cancel Booking
            </button>
            )}

        </div>

      ))}

    </div>
  );
}

export default Bookings;