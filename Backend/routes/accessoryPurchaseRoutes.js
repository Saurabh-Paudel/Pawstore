const express = require("express");
const router = express.Router();
const AccessoryPurchase = require("../models/accessoryPurchaseModel");
const authMiddleware = require("../middleware/auth");

// Initiate Accessory Purchase
router.post("/initiate", authMiddleware, async (req, res) => {
  try {
    const {
      accessoryId,
      amount,
      transactionUuid,
      quantity,
      color,
      size,
      image,
      name,
      description,
      price,
    } = req.body;
    const userId = req.user._id || req.user.userId;

    if (
      !accessoryId ||
      !userId ||
      !amount ||
      !transactionUuid ||
      !quantity ||
      !image ||
      !name ||
      !description ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
        missingFields: {
          accessoryId,
          userId,
          amount,
          transactionUuid,
          quantity,
          image,
          name,
          description,
          price,
        },
      });
    }

    if (amount <= 0 || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount and quantity must be greater than 0",
      });
    }

    const purchase = new AccessoryPurchase({
      accessoryId,
      userId,
      amount,
      transactionUuid,
      quantity,
      color,
      size,
      image,
      name,
      description,
      price,
      paymentStatus: "PENDING",
      deliveryStatus: "Processing",
    });

    await purchase.save();
    res.status(200).json({ success: true, transactionUuid });
  } catch (error) {
    console.error("Accessory purchase initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate transaction",
      error: error.message,
    });
  }
});

module.exports = router;
