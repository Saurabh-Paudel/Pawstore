const express = require("express");
const router = express.Router();
const DogPurchase = require("../models/dogPurchaseModel");
const AccessoryPurchase = require("../models/accessoryPurchaseModel");
const crypto = require("crypto");
const authMiddleware = require("../middleware/auth");

const secretKey = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
const productCode = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

// Dog Purchase Initiation
router.post("/dog-purchase/initiate", authMiddleware, async (req, res) => {
  try {
    const { dogId, amount, transactionUuid, age, vaccinated, image, breed } = req.body;
    const userId = req.user._id || req.user.userId;

    if (!dogId || !userId || !amount || !transactionUuid || !age || !vaccinated || !image || !breed) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingPurchase = await DogPurchase.findOne({ dogId, status: "PENDING" });
    if (existingPurchase) {
      return res.status(400).json({ success: false, message: "This dog is already in a pending transaction" });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be greater than 0" });
    }

    const purchase = new DogPurchase({
      dogId, userId, amount, transactionUuid, age, vaccinated, image, breed, status: "PENDING",
    });
    await purchase.save();
    res.status(200).json({ success: true, transactionUuid });
  } catch (error) {
    console.error("Dog purchase initiation error:", error);
    res.status(500).json({ success: false, message: "Failed to initiate transaction", error: error.message });
  }
});

// Accessory Purchase Initiation
router.post("/accessory-purchase/initiate", authMiddleware, async (req, res) => {
  try {
    const { accessoryId, amount, transactionUuid, quantity, color, size, image, name, description, price } = req.body;
    const userId = req.user._id || req.user.userId;

    if (!accessoryId || !userId || !amount || !transactionUuid || !quantity || !image || !name || !description || !price) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    if (amount <= 0 || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Amount and quantity must be greater than 0" });
    }

    const purchase = new AccessoryPurchase({
      accessoryId, userId, amount, transactionUuid, quantity, color, size, image, name, description, price,
      paymentStatus: "PENDING", deliveryStatus: "Processing",
    });
    await purchase.save();
    res.status(200).json({ success: true, transactionUuid });
  } catch (error) {
    console.error("Accessory purchase initiation error:", error);
    res.status(500).json({ success: false, message: "Failed to initiate transaction", error: error.message });
  }
});

// Common Payment Success Handler
router.get("/payment-success", async (req, res) => {
  try {
    if (!req.query.data) {
      throw new Error("No data parameter received from eSewa");
    }

    const responseBody = JSON.parse(Buffer.from(req.query.data, "base64").toString());
    const { transaction_code, transaction_uuid, signature, signed_field_names } = responseBody;

    if (!transaction_code || !transaction_uuid || !signature) {
      throw new Error("Missing required response fields from eSewa");
    }

    // Verify signature
    const message = signed_field_names.split(",").map((field) => `${field}=${responseBody[field]}`).join(",");
    const computedSignature = crypto.createHmac("sha256", secretKey).update(message).digest("base64");

    if (computedSignature !== signature) {
      return res.redirect(`${frontendUrl}/payment-failure?reason=invalid_signature`);
    }

    // Check both purchase types
    let purchase = await DogPurchase.findOneAndUpdate(
      { transactionUuid: transaction_uuid },
      { status: "COMPLETE", transactionCode: transaction_code },
      { new: true }
    );

    if (!purchase) {
      purchase = await AccessoryPurchase.findOneAndUpdate(
        { transactionUuid: transaction_uuid },
        { paymentStatus: "COMPLETE", transactionCode: transaction_code },
        { new: true }
      );
    }

    if (!purchase) {
      return res.redirect(`${frontendUrl}/payment-failure?reason=transaction_not_found`);
    }

    res.redirect(`${frontendUrl}/payment-success?transactionId=${transaction_uuid}`);
  } catch (error) {
    console.error("Payment success handling error:", error.message);
    res.redirect(`${frontendUrl}/payment-failure?reason=${encodeURIComponent(error.message)}`);
  }
});

// Common Payment Failure Handler
router.get("/payment-failure", (req, res) => {
  res.redirect(`${frontendUrl}/payment-failure?reason=transaction_failed`);
});

module.exports = router;