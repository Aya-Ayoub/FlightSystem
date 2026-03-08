import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/flights" element={<Flights />} />

        <Route path="/bookings" element={<Bookings />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;