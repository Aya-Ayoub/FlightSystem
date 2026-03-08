import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{marginBottom:"20px"}}>
      <Link to="/flights">Flights</Link> |{" "}
      <Link to="/bookings">My Bookings</Link>|{" "}
      <Link to="/">Register</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/verify-email">Verify Email</Link>
    </nav>
  );
}

export default Navbar;