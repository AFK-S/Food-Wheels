const InventorySchema = require("../models/inventory.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.create = async (req, res, next) => {
  try {
    const { name, category, quantity } = req.body;

    const response = await InventorySchema.findOne({ name: name });
    if (response) {
      throw new ApiError("Item name already exists", 400, "ItemExists");
    }

    const inventory = await InventorySchema.create({
      name: name,
      category: category,
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
