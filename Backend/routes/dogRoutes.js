// backend/routes/dogRoutes.js
const express = require("express");
const {
  createDog,
  updateDog,
  deleteDog,
  getAllDogs,
  getDogById,
} = require("../controller/dogController");
const router = express.Router();

router.get("/", getAllDogs);
router.get("/:id", getDogById);
router.post("/", createDog);
router.put("/:id", updateDog);
router.delete("/:id", deleteDog);

module.exports = router;
