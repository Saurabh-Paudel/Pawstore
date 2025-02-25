const express = require("express");
const dbConnection = require("./config/db");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const userInfo = require("./routes/userInfoRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const accountManagementRoutes = require("./routes/accountManagementRoutes");
const dogRoutes = require("./routes/dogRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/public")));

// Connect to MongoDB
dbConnection();

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/user", userInfo);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/account", accountManagementRoutes);
app.use("/api/dogs", dogRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
