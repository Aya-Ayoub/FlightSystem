import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Flights />} />

        <Route path="/bookings" element={<Bookings />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;