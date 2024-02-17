const express = require("express");
const { body, param } = require("express-validator");
const {
  create,
  findAll,
  findOne,
  deleteOne,
} = require("../controllers/dish.controller");
const {
  uploadAvatar,
  deleteAvatar,
} = require("../controllers/cloudinary.controller");
const { upload } = require("../middlewares/multer.middleware");
const fieldHandler = require("../middlewares/fieldHandler.middleware");

const router = express.Router();

router.post("/", upload.single("coverImage"), uploadAvatar, create);

router.get("/", findAll);

router.get(
  "/:dish_id",
  param("dish_id").trim().notEmpty().withMessage("Dish ID is required"),
  fieldHandler,
  findOne
);

router.delete(
  "/:dish_id",
  param("dish_id").trim().notEmpty().withMessage("Dish ID is required"),
  fieldHandler,
  deleteOne,
  deleteAvatar
);

module.exports = router;
