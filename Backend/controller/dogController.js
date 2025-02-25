// backend/controller/dogController.js
const Dog = require("../models/dogModel");
const path = require("path");
const fs = require("fs");

exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDog = async (req, res) => {
  try {
    let imagePath = "";
    if (req.files && req.files.image) {
      let image = req.files.image;
      // Save images to Client/public/DogImages
      const uploadDir = path.join(__dirname, "../../client/public/DogImages");
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
      imagePath = `/DogImages/${fileName}`;
    }

    const newDog = new Dog({ ...req.body, image: imagePath });
    await newDog.save();
    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });

    let imagePath = dog.image;
    if (req.files && req.files.image) {
      // Delete old image if it exists
      if (dog.image) {
        // Check in both DogImages and uploads folders if needed
        const oldImagePath = path.join(
          __dirname,
          "../../client/public",
          dog.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Save new image to a separate folder (uploads)
      const uploadDir = path.join(__dirname, "../../client/public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      let image = req.files.image;
      const fileName = `${Date.now()}_${image.name}`;
      imagePath = `/uploads/${fileName}`;
      image.mv(path.join(uploadDir, fileName));
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imagePath },
      { new: true }
    );
    res.json(updatedDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    if (dog.image) {
      const filePath = path.join(__dirname, "../../client/public", dog.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
