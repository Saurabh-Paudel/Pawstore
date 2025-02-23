const express = require("express");
const router = express.Router();
const {
  subscribe,
  getSubscribers,
  deleteSubscriber,
} = require("../controller/newsletterController");

router.post("/subscribe", subscribe); // Subscribe
router.get("/subscribers", getSubscribers); // Get all subscribers
router.delete("/subscribe/:email", deleteSubscriber); // Delete a subscriber

module.exports = router;
