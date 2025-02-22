const Newsletter = require("../models/newsletterModel");

// Subscribe to Newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const existingUser = await Newsletter.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already subscribed" });

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res
      .status(201)
      .json({ message: "Subscribed successfully!", subscriber: newSubscriber });
  } catch (error) {
    console.error("Error in subscribe:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Subscribers
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ date: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error in getSubscribers:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a Subscriber
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Newsletter.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ error: "Subscriber not found" });

    res
      .status(200)
      .json({ message: "Deleted successfully", subscriber: deleted });
  } catch (error) {
    console.error("Error in deleteSubscriber:", error);
    res.status(500).json({ error: "Server error" });
  }
};
