const express = require("express");
const router = express.Router();
const DogPurchase = require("../models/dogPurchaseModel");
const authMiddleware = require("../middleware/auth");

console.log("DogPurchaseRoutes.js loaded at:", new Date().toISOString());

// Initiate Dog Purchase
router.post("/initiate", authMiddleware, async (req, res) => {
  console.log("Endpoint /initiate hit with body:", req.body);
  try {
    const {
      dogId,
      amount,
      transactionUuid,
      age,
      vaccinated,
      image,
      breed,
      name,
    } = req.body;
    const userId = req.user._id;

    if (
      !dogId ||
      !amount ||
      !transactionUuid ||
      !age ||
      vaccinated === undefined ||
      !image ||
      !breed ||
      !name
    ) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (amount <= 0) {
      console.log("Invalid amount:", amount);
      return res
        .status(400)
        .json({ success: false, message: "Amount must be greater than 0" });
    }

    // Convert vaccinated to Boolean
    const vaccinatedBoolean = vaccinated === true || vaccinated === "Yes";

    // Create a new purchase without checking for existing ones
    console.log("Creating new purchase with transactionUuid:", transactionUuid);
    const purchase = new DogPurchase({
      dogId,
      userId,
      amount,
      transactionUuid,
      age,
      vaccinated: vaccinatedBoolean,
      image,
      breed,
      name,
      status: "PENDING",
      deliveryStatus: "Processing",
    });

    await purchase.save();
    console.log("New purchase saved with transactionUuid:", transactionUuid);
    res.status(200).json({ success: true, transactionUuid });
  } catch (error) {
    console.error("Dog purchase initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate transaction",
      error: error.message,
    });
  }
});

// Get User's Dog Purchases
router.get("/my-dog-purchases", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const purchases = await DogPurchase.find({ userId });
    console.log("Fetched user dog purchases:", purchases);
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching user dog purchases:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your dog purchases",
      error: error.message,
    });
  }
});

// Get All Dog Purchases or Filter by User
router.get("/dog-purchases", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const queryUserId = req.query.userId;
    const purchases = queryUserId
      ? await DogPurchase.find({ userId: queryUserId })
      : await DogPurchase.find({});
    console.log("Fetched dog purchases:", purchases);

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching dog purchases:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch dog purchases", error: error.message });
  }
});

// Admin: Update Dog Purchase Status
router.put("/dog-purchases/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update purchase details" });
    }

    const { id } = req.params;
    const { status, deliveryStatus } = req.body;

    const updatedPurchase = await DogPurchase.findByIdAndUpdate(
      id,
      { status, deliveryStatus },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Dog purchase not found" });
    }

    console.log("Updated purchase:", updatedPurchase);
    res.status(200).json({
      message: "Purchase updated successfully",
      purchase: updatedPurchase,
    });
  } catch (error) {
    console.error("Error updating dog purchase:", error);
    res
      .status(500)
      .json({ message: "Failed to update purchase", error: error.message });
  }
});

module.exports = router;