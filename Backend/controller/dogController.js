const Dog = require("../models/dogModel");
const path = require("path");
const fs = require("fs");

// Directory where dog images will be saved
const uploadDir = path.join(__dirname, "../../client/public/DogImages");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Get all dogs
exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dogs", error: error.message });
  }
};

// Get dog by ID
exports.getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.status(200).json(dog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dog", error: error.message });
  }
};

// Create a new dog with an image
exports.createDog = async (req, res) => {
  try {
    // Check if image is provided in the request
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imageFile = req.files.image;

    // Generate a unique image filename
    const imageName = `${Date.now()}_${imageFile.name}`;
    const imagePath = `/DogImages/${imageName}`; // Path to store in MongoDB

    // Move the uploaded image to the upload directory
    imageFile.mv(path.join(uploadDir, imageName), async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving image", error: err.message });
      }

      // Create a new dog entry with the uploaded image path
      const newDog = new Dog({
        ...req.body,
        image: imagePath, // Store the relative image path
      });

      // Save the dog to the database
      const savedDog = await newDog.save();

      // Send success response
      res.status(201).json(savedDog);
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating dog", error: error.message });
  }
};

// Update a dog's details (including image if provided)
exports.updateDog = async (req, res) => {
  try {
    // Check if image is provided in the request
    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      // Generate a unique image filename
      const imageName = `${Date.now()}_${imageFile.name}`;
      const imagePath = `/DogImages/${imageName}`; // Path to store in MongoDB

      // Move the uploaded image to the upload directory
      imageFile.mv(path.join(uploadDir, imageName), async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error saving image", error: err.message });
        }

        // Update the dog with the new image path
        req.body.image = imagePath; // Update the image path in the request body
      });
    }

    // Find and update the dog by ID
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDog) return res.status(404).json({ message: "Dog not found" });
    res.status(200).json(updatedDog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating dog", error: error.message });
  }
};

// Delete a dog
exports.deleteDog = async (req, res) => {
  try {
    // Find and delete the dog by ID
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);

    if (!deletedDog) return res.status(404).json({ message: "Dog not found" });

    // Optionally, you could also delete the image file from the server here
    const imagePath = path.join(
      uploadDir,
      deletedDog.image.split("/DogImages/")[1]
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image file from the server
    }

    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting dog", error: error.message });
  }
};
