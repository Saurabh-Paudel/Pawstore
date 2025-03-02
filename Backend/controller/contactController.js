const Contact = require("../models/contactModel");

// Update or create contact info
exports.updateContact = async (req, res) => {
  try {
    const { address, phone, email } = req.body;
    if (!address || !phone || !email) {
      return res
        .status(400)
        .json({ message: "Address, phone, and email are required" });
    }

    // Check if contact exists, update it; otherwise, create a new one
    let contact = await Contact.findOne();
    if (contact) {
      contact.address = address;
      contact.phone = phone;
      contact.email = email;
      await contact.save();
    } else {
      contact = new Contact({ address, phone, email });
      await contact.save();
    }

    res
      .status(200)
      .json({ message: "Contact info updated successfully", contact });
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(500)
      .json({ message: "Failed to update contact", error: error.message });
  }
};

// Get current contact info
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne(); // Fetch the first contact (simplified)
    if (!contact) {
      return res.status(404).json({ message: "No contact info found" });
    }
    res.status(200).json({ contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch contact", error: error.message });
  }
};
