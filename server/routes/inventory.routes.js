const express = require("express");
const { body, param } = require("express-validator");
const {
  create,
  findAll,
  updateQuantity,
  deleteOne,
} = require("../controllers/inventory.controller");
const fieldHandler = require("../middlewares/fieldHandler.middleware");

const router = express.Router();

router.post(
  "/",
  body("food_type").trim().notEmpty().withMessage("Food Type is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("quantity").trim().notEmpty().withMessage("Quantity is required"),
  fieldHandler,
  create
);

router.get("/", findAll);

router.put(
  "/:inventory_id",
  param("inventory_id")
    .trim()
    .notEmpty()
    .withMessage("Inventory ID is required"),
  body("quantity").trim().notEmpty().withMessage("Quantity is required"),
  fieldHandler,
  updateQuantity
);

router.delete(
  "/:inventory_id",
  param("inventory_id")
    .trim()
    .notEmpty()
    .withMessage("Inventory ID is required"),
  fieldHandler,
  deleteOne
);

module.exports = router;
