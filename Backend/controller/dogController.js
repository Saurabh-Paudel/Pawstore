// backend/controller/dogController.js
const Dog = require("../models/dogModel");
const path = require("path");
const fs = require("fs");

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

exports.createDog = async (req, res) => {
  try {
    const newDog = new Dog(req.body);
    console.log("this is new dog", newDog);

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating dog", error: error.message });
  }
};

exports.updateDog = async (req, res) => {
  try {
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

exports.deleteDog = async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) return res.status(404).json({ message: "Dog not found" });
    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting dog", error: error.message });
  }
};
