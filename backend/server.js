const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));


app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/test-protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route works",
    user: req.user
  });
});