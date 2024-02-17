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

router.post(
  "/",

  body("name").trim().notEmpty().withMessage("Dish name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("food_type").trim().notEmpty().withMessage("Food type is required"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price should be numeric"),
  body("discount")
    .trim()
    .notEmpty()
    .withMessage("Discount is required")
    .isNumeric()
    .withMessage("Discount should be numeric"),
  body("is_signature")
    .trim()
    .notEmpty()
    .withMessage("Signature dish is required")
    .isBoolean()
    .withMessage("Signature dish should be boolean"),

  fieldHandler,
  upload.single("coverImage"),
  uploadAvatar,
  create
);

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
