const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("./index");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      upload_preset: "FoodWheels",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch (error) {
    return null;
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
