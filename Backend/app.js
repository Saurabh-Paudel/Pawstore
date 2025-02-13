const express = require("express");
const dbConnection = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
dbConnection();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
