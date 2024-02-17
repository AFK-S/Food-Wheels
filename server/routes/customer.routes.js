const express = require("express");
const { body, param } = require("express-validator");
const {
  register,
  login,
  findOne,
  deleteOne,
  logout,
} = require("../controllers/customer.controller");
const fieldHandler = require("../middlewares/fieldHandler.middleware");

const router = express.Router();

router.post(
  "/register",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email_address")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Email address is invalid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 }),
  fieldHandler,
  register
);

router.post(
  "/login",
  body("email_address")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Email address is invalid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 }),
  fieldHandler,
  login
);

router.get(
  "/:customer_id",
  param("customer_id").trim().notEmpty().withMessage("Customer ID is required"),
  fieldHandler,
  findOne
);

router.delete(
  "/:customer_id",
  param("customer_id").trim().notEmpty().withMessage("Customer ID is required"),
  fieldHandler,
  deleteOne
);

router.get("/logout", logout);

module.exports = router;
