import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{marginBottom:"20px"}}>
      <Link to="/">Flights</Link> |{" "}
      <Link to="/bookings">My Bookings</Link>
    </nav>
  );
}

export default Navbar;