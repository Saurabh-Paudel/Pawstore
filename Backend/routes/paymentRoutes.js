const express = require("express");
const router = express.Router();
const DogPurchase = require("../models/dogPurchaseModel");
const AccessoryPurchase = require("../models/accessoryPurchaseModel");
const crypto = require("crypto");

const secretKey = process.env.ESEWA_SECRET_KEY;
const productCode = process.env.ESEWA_PRODUCT_CODE;
const frontendUrl = process.env.FRONTEND_URL;

router.get("/payment-success", async (req, res) => {
  try {
    if (!req.query.data) {
      throw new Error("No data parameter received from eSewa");
    }

    console.log("Raw Data:", req.query.data);
    const responseBody = JSON.parse(
      Buffer.from(req.query.data, "base64").toString()
    );

    const {
      transaction_code,
      transaction_uuid,
      total_amount,
      signature,
      signed_field_names,
    } = responseBody;

    if (
      !transaction_code ||
      !transaction_uuid ||
      !total_amount ||
      !signature ||
      !signed_field_names
    ) {
      throw new Error("Missing required response fields from eSewa");
    }

    // Construct the message exactly as eSewa expects
    const message = signed_field_names
      .split(",")
      .map((field) => `${field}=${responseBody[field]}`)
      .join(",");


    const computedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(message)
      .digest("base64");

    if (computedSignature !== signature) {
      console.error("Signature mismatch!");
      // Additional debug: Compute signature with frontend fields
      const frontendMessage = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;
      const frontendSignature = crypto
        .createHmac("sha256", secretKey)
        .update(frontendMessage)
        .digest("base64");
      return res.redirect(
        `${frontendUrl}/payment-failure?reason=invalid_signature`
      );
    }

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
      return res.redirect(
        `${frontendUrl}/payment-failure?reason=transaction_not_found`
      );
    }

    res.redirect(
      `${frontendUrl}/payment-success?transactionId=${transaction_uuid}`
    );
  } catch (error) {
    console.error("Payment success handling error:", error.message);
    res.redirect(
      `${frontendUrl}/payment-failure?reason=${encodeURIComponent(
        error.message
      )}`
    );
  }
});

router.get("/payment-failure", (req, res) => {
  res.redirect(`${frontendUrl}/payment-failure?reason=transaction_failed`);
});

module.exports = router;
