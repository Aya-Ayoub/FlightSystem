const API = "http://localhost:5000/api";

export const searchFlights = async (query) => {
  const res = await fetch(
    `${API}/flights/search?from=${query.from}&to=${query.to}&date=${query.date}`
  );
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${API}/bookings`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return res.json();
};

export const cancelBooking = async (id) => {
  const res = await fetch(`${API}/bookings/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return res.json();
};