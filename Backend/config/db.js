const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/pawstore-db")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error: ", err));
};

module.exports = dbConnection;
