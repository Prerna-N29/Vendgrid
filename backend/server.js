const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Vendgrid API is running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

console.log("Models loaded ✅");

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const { verifyToken } = require("./middleware/authMiddleware");

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});