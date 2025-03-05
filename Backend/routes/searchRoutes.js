// routes/searchRoutes.js
const express = require("express");
const { searchAll } = require("../controller/searchController");
const router = express.Router();

// Single endpoint for combined search
router.get("/", searchAll);

module.exports = router;
