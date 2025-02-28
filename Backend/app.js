require("dotenv").config();
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
const breedRoutes = require("./routes/dogBreedRoutes");
const messageRoutes = require("./routes/messageRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/breeds", breedRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
