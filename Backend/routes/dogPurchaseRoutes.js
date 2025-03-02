const express = require("express");
const router = express.Router();
const DogPurchase = require("../models/dogPurchaseModel");
const authMiddleware = require("../middleware/auth");

//Initiate Dog Purchase
router.post("/initiate", authMiddleware, async (req, res) => {
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
    const userId = req.user._id; // Use ObjectId from middleware

    if (
      !dogId ||
      !amount ||
      !transactionUuid ||
      !age ||
      !vaccinated ||
      !image ||
      !breed ||
      !name
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be greater than 0" });
    }

    const existingPurchase = await DogPurchase.findOne({
      dogId,
      status: "PENDING",
    });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "This dog is already in a pending transaction",
      });
    }

    const purchase = new DogPurchase({
      dogId,
      userId,
      amount,
      transactionUuid,
      age,
      vaccinated,
      image,
      breed,
      name,
      status: "PENDING",
      deliveryStatus: "Processing",
    });

    await purchase.save();
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

//Get User's Dog Purchases
router.get("/my-dog-purchases", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Use ObjectId from middleware
    console.log("Fetching dog purchases for userId:", userId); // Debugging
    const purchases = await DogPurchase.find({ userId });
    console.log("Dog purchases found:", purchases); // Debugging
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
