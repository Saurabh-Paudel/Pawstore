const Banner = require("../models/bannerModel");
const path = require("path");
const fs = require("fs").promises;

// Insert a new banner
const createBanner = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { name, title, description } = req.body; // Added name
    if (!name || !title || !description) {
      return res
        .status(400)
        .json({ message: "Name, title, and description are required" });
    }
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image = req.files.image;
    const imageName = `${Date.now()}-${image.name}`;
    const imagePath = path.join(
      __dirname,
      "../../client/public/BannerImages",
      imageName
    );

    // Ensure the directory exists
    await fs.mkdir(path.dirname(imagePath), { recursive: true });
    await image.mv(imagePath);

    const banner = new Banner({
      name, // Added name
      title,
      description,
      image: `/BannerImages/${imageName}`,
    });
    await banner.save();
    res.status(201).json({ message: "Banner created successfully", banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    res
      .status(500)
      .json({ message: "Failed to create banner", error: error.message });
  }
};

// Update an existing banner
const updateBanner = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { id } = req.params;
    const { name, title, description } = req.body; 

    const existingBanner = await Banner.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    let updateData = { name, title, description }; 

    if (req.files && req.files.image) {
      const oldImagePath = path.join(
        __dirname,
        "../client/public",
        existingBanner.image
      );
      try {
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.warn("Could not delete old image:", err.message);
      }

      const image = req.files.image;
      const imageName = `${Date.now()}-${image.name}`;
      const imagePath = path.join(
        __dirname,
        "../../client/public/BannerImages",
        imageName
      );
      await image.mv(imagePath);
      updateData.image = `/BannerImages/${imageName}`;
    }

    const banner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res
      .status(500)
      .json({ message: "Failed to update banner", error: error.message });
  }
};

// Delete a banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const imagePath = path.join(__dirname, "../../client/public", banner.image);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn("Could not delete image:", err.message);
    }

    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res
      .status(500)
      .json({ message: "Failed to delete banner", error: error.message });
  }
};

// Get all banners
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch banners", error: error.message });
  }
};

// Export all functions
module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanners,
};
