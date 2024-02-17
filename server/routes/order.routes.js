const express = require("express");
const { body, param } = require("express-validator");
const {
  create,
  findAllByCustomer,
  findAllByStatus,
  findOne,
  deleteOne,
  findAllByItem,
} = require("../controllers/order.controller");
const fieldHandler = require("../middlewares/fieldHandler.middleware");

const router = express.Router();

router.post(
  "/",
  body("customer_id").trim().notEmpty().withMessage("Customer ID is required"),
  body("total").trim().notEmpty().withMessage("Total is required"),
  fieldHandler,
  create
);

router.get(
  "/customer/:customer_id",
  param("customer_id").trim().notEmpty().withMessage("Customer ID is required"),
  fieldHandler,
  findAllByCustomer
);

router.get(
  "/status/:status",
  param("status").trim().notEmpty().withMessage("Status is required"),
  fieldHandler,
  findAllByStatus
);

router.get("/item", findAllByItem);

router.get(
  "/:order_id",
  param("order_id").trim().notEmpty().withMessage("Order ID is required"),
  fieldHandler,
  findOne
);

router.delete(
  "/:order_id",
  param("order_id").trim().notEmpty().withMessage("Order ID is required"),
  fieldHandler,
  deleteOne
);

module.exports = router;
