const express = require("express");
const dbConnection = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const userInfo = require("./routes/userInfoRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
dbConnection();

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/user", userInfo);
app.use("/api/newsletter", newsletterRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
