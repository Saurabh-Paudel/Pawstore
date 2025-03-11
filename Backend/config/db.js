require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    // .connect("mongodb://localhost:27017")
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));
};

module.exports = dbConnection;
