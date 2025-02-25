// backend/routes/breedRoutes.js
const express = require("express");
const {
  getAllBreeds,
  getBreedById,
  createBreed,
  updateBreed,
  deleteBreed,
} = require("../controller/dogBreedController");
const router = express.Router();

// Route to get all breeds
router.get("/", getAllBreeds);
router.get("/:id", getBreedById);
router.post("/", createBreed);
router.put("/:id", updateBreed);
router.delete("/:id", deleteBreed);

module.exports = router;
