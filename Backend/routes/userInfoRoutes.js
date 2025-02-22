const express = require("express");
const {
  insertUser,
  updateUser,
  getUserByEmail,
} = require("../controller/userInfoController");

const router = express.Router();

router.post("/insert", insertUser);

router.put("/update/:email", updateUser);

router.get("/:email", getUserByEmail);

module.exports = router;
