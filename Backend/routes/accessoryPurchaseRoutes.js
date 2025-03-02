const express = require("express");
const router = express.Router();
const AccessoryPurchase = require("../models/accessoryPurchaseModel");
const authMiddleware = require("../middleware/auth");

//Initiate Accessory Purchase
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
    const userId = req.user._id; // Use ObjectId from middleware

    if (
      !accessoryId ||
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

//Get User's Accessory Purchases
router.get("/my-purchases", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Use ObjectId from middleware
    console.log("Fetching accessory purchases for userId:", userId); // Debugging
    const accessoryPurchases = await AccessoryPurchase.find({ userId });
    console.log("Accessory purchases found:", accessoryPurchases); // Debugging
    res.status(200).json(accessoryPurchases);
  } catch (error) {
    console.error("Error fetching user accessory purchases:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your accessory purchases",
      error: error.message,
    });
  }
});

//Admin: Get All Accessory Purchases
router.get("/all-purchases", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const accessoryPurchases = await AccessoryPurchase.find();
    if (!accessoryPurchases.length) {
      return res.status(404).json({
        success: false,
        message: "No accessory purchases found",
      });
    }

    res.status(200).json({
      success: true,
      purchases: accessoryPurchases,
    });
  } catch (error) {
    console.error("Error fetching all accessory purchases:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
      error: error.message,
    });
  }
});

//Admin: Update Accessory Purchase Status
router.put("/accessory-purchases/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update purchase details" });
    }

    const { id } = req.params;
    const { paymentStatus, deliveryStatus } = req.body;

    const updatedOrder = await AccessoryPurchase.findByIdAndUpdate(
      id,
      { paymentStatus, deliveryStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating accessory purchase:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update purchase",
      error: error.message,
    });
  }
});

module.exports = router;
