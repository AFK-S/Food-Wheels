const express = require("express");
const {
  register,
  login,
  findOne,
  deleteOne,
  logout,
} = require("../controllers/customer.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:customer_id", findOne);
router.delete("/:customer_id", deleteOne);
router.get("/logout", logout);

module.exports = router;
