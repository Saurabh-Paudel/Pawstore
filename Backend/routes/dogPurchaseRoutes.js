const express = require("express");
const router = express.Router();
const DogPurchase = require("../models/dogPurchaseModel");
const authMiddleware = require("../middleware/auth");

// Initiate Dog Purchase
router.post("/initiate", authMiddleware, async (req, res) => {
  try {
    const { dogId, amount, transactionUuid, age, vaccinated, image, breed } =
      req.body;
    const userId = req.user._id || req.user.userId;

    if (
      !dogId ||
      !userId ||
      !amount ||
      !transactionUuid ||
      !age ||
      !vaccinated ||
      !image ||
      !breed
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        missingFields: {
          dogId,
          userId,
          amount,
          transactionUuid,
          age,
          vaccinated,
          image,
          breed,
        },
      });
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

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
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
      status: "PENDING",
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

module.exports = router;
