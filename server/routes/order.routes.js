const express = require("express");
const { body, param } = require("express-validator");
const {
  create,
  findAllByCustomer,
  findAllByStatus,
  findOne,
  deleteOne,
  findAllByItem,
  updateFeedbackAndRating,
  updateStatus,
  findFeedbacks,
} = require("../controllers/order.controller");
const { todayOrders } = require("../controllers/dashboard.controller");
const fieldHandler = require("../middlewares/fieldHandler.middleware");

const router = express.Router();

router.post(
  "/",
  body("customer_id").trim().notEmpty().withMessage("Customer ID is required"),
  body("total").trim().notEmpty().withMessage("Total is required"),
  body("coordinates.latitude")
    .trim()
    .notEmpty()
    .withMessage("Coordinates Latitude is required"),
  body("coordinates.longitude")
    .trim()
    .notEmpty()
    .withMessage("Coordinates Longitude is required"),
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

router.post(
  "/feedback-rating/:order_id",
  param("order_id").trim().notEmpty().withMessage("Order ID is required"),
  body("feedback").trim().notEmpty().withMessage("Feedback is required"),
  body("rating").trim().notEmpty().withMessage("Rating is required"),
  fieldHandler,
  updateFeedbackAndRating
);

router.put(
  "/status/:order_id",
  param("order_id").trim().notEmpty().withMessage("Order ID is required"),
  body("status").trim().notEmpty().withMessage("Status is required"),
  fieldHandler,
  updateStatus
);

router.get("/today/orders", todayOrders);

router.get("/all/feedback", findFeedbacks);

module.exports = router;
