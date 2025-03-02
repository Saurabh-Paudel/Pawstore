const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.userId && !decoded._id) {
      return res.status(401).json({ error: "Token missing user ID" });
    }
    const userId = decoded.userId || decoded._id;
    req.user = {
      _id: new mongoose.Types.ObjectId(userId), // Correct instantiation
      userId: userId, // Keep original string for consistency
      role: decoded.role, // Include role for admin checks
    };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;