const express = require("express");
const {
  create,
  findAll,
  findOne,
  deleteOne,
} = require("../controllers/dish.controller");
const { uploadAvatar } = require("../controllers/cloudinary.controller");

const router = express.Router();

router.post("/", uploadAvatar, create);
router.get("/", findAll);
router.get("/:dish_id", findOne);
router.delete("/:dish_id", deleteOne);

module.exports = router;
