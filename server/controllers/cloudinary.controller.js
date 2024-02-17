const ApiError = require("../utils/ApiError");
const { uploadOnCloudinary } = require("../config/cloudinary.js");

exports.uploadAvatar = async (req, res, next) => {
  try {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      throw new ApiError("Cover Image file is missing", 400, "FilePathError");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
      throw new ApiError("Error while uploading on avatar", 400, "UploadError");
    }

    req.image_url = avatar.url;
    return next();
  } catch (err) {
    next(err);
  }
};
