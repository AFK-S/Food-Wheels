const InventorySchema = require("../models/inventory.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.create = async (req, res, next) => {
  try {
    const { category, food_type, quantity } = req.body;

    const response = await InventorySchema.findOne({
      category: category,
      food_type: food_type,
    });
    if (response) {
      const newResponse = await InventorySchema.findByIdAndUpdate(
        response._id,
        {
          quantity: parseInt(response.quantity) + parseInt(quantity),
        },
        { new: true }
      );
      return res
        .status(200)
        .json(new ApiResponse(newResponse, "Item updated", 200));
    }

    const inventory = await InventorySchema.create({
      category: category,
      food_type: food_type,
      quantity: quantity,
    });

    return res
      .status(201)
      .json(new ApiResponse(inventory, "Item created", 201));
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const response = await InventorySchema.find()
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json(new ApiResponse(response, "Items found", 200));
  } catch (err) {
    next(err);
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const { inventory_id } = req.params;
    const { quantity } = req.body;

    const response = await InventorySchema.findByIdAndUpdate(
      inventory_id,
      {
        quantity: quantity,
      },
      { new: true }
    );

    if (!response) {
      throw new ApiError("Item not found", 404, "ItemNotFound");
    }

    return res.status(200).json(new ApiResponse(response, "Item updated", 200));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { inventory_id } = req.params;

    const response = await InventorySchema.findByIdAndDelete(inventory_id);

    if (!response) {
      throw new ApiError("Item not found", 404, "ItemNotFound");
    }

    return res.status(200).json(new ApiResponse(response, "Item deleted", 200));
  } catch (err) {
    next(err);
  }
};
