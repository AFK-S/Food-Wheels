const ApiError = require("../utils/ApiError");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary.js");

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

    req.coverImage = avatar;
    return next();
  } catch (err) {
    next(err);
  }
};

exports.deleteAvatar = async (req, res, next) => {
  try {
    if (!req.public_id) {
      throw new ApiError("Cover Image is missing", 400, "ImageUrlError");
    }

    const response = await deleteFromCloudinary(req.public_id);
    if (response.result !== "ok") {
      throw new ApiError(
        "Something went wrong while deleting cover image",
        400,
        "DeleteError"
      );
    }
    return;
  } catch (err) {
    next(err);
  }
};
