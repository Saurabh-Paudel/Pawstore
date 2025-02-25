const Breed = require("../models/dogBreedsModel");
const path = require("path");
const fs = require("fs");

exports.getAllBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find();
    res.json(breeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBreedById = async (req, res) => {
  try {
    const breed = await Breed.findById(req.params.id);
    if (!breed) return res.status(404).json({ message: "Breed not found" });
    res.json(breed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBreed = async (req, res) => {
  try {
    let imagePath = "";
    if (req.files && req.files.image) {
      let image = req.files.image;
      // Save images to Client/public/BreedImages
      const uploadDir = path.join(__dirname, "../../client/public/BreedImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}_${image.name}`;
      const fullPath = path.join(uploadDir, fileName);
      image.mv(fullPath, (err) => {
        if (err) {
          return res.status(500).json({ error: "Image upload failed" });
        }
      });
      // Save relative path for serving via Express
      imagePath = `/BreedImages/${fileName}`;
    }

    const newBreed = new Breed({ ...req.body, image: imagePath });
    await newBreed.save();
    res.status(201).json(newBreed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBreed = async (req, res) => {
  try {
    const breed = await Breed.findById(req.params.id);
    if (!breed) return res.status(404).json({ message: "Breed not found" });

    let imagePath = breed.image;

    // If a new image is provided, delete the old one and upload the new one
    if (req.files && req.files.image) {
      // Delete old image if it exists
      if (breed.image) {
        const oldImagePath = path.join(
          __dirname,
          "../../client/public",
          breed.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Remove the old image from the file system
        }
      }

      // Save new image to BreedImages folder
      const uploadDir = path.join(__dirname, "../../client/public/BreedImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      let image = req.files.image;
      const fileName = `${Date.now()}_${image.name}`;
      imagePath = `/BreedImages/${fileName}`;
      image.mv(path.join(uploadDir, fileName)); // Move the new image to the directory
    }

    const updatedBreed = await Breed.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imagePath }, // Update the breed with new data
      { new: true }
    );
    res.json(updatedBreed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBreed = async (req, res) => {
  try {
    const breed = await Breed.findById(req.params.id);
    if (!breed) return res.status(404).json({ message: "Breed not found" });

    // If the breed has an image, delete it from the file system
    if (breed.image) {
      const filePath = path.join(__dirname, "../../client/public", breed.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove the image file from the file system
      }
    }

    // Delete the breed record from the database
    await Breed.findByIdAndDelete(req.params.id);
    res.json({ message: "Breed deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
