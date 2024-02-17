const express = require("express");
const {
  create,
  findAllByCustomer,
  findAllByStatus,
  findOne,
  deleteOne,
  findAllByItem,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/", create);
router.get("/customer/:customer_id", findAllByCustomer);
router.get("/status/:status", findAllByStatus);
router.get("/item", findAllByItem);
router.get("/:order_id", findOne);
router.delete("/:order_id", deleteOne);

module.exports = router;
