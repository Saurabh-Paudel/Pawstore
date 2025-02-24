const express = require("express");
const {
  insertUser,
  updateUser,
  getUserByEmail,
  getAllUsers,
} = require("../controller/userInfoController");

const router = express.Router();

router.post("/insert", insertUser);

router.put("/update/:email", updateUser);

router.get("/users", getAllUsers);

router.get("/:email", getUserByEmail);

module.exports = router;
