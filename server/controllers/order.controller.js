const OrderSchema = require("../models/order.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.create = async (req, res, next) => {
  try {
    const { customer_id, items, total } = req.body;

    const order = await OrderSchema.create({
      customer_id: customer_id,
      items: items,
      total: total,
    });

    return res
      .status(201)
      .json(new ApiResponse(order, "Order created successfully", 201));
  } catch (err) {
    next(err);
  }
};

exports.findAllByCustomer = async (req, res, next) => {
  try {
    const { customer_id } = req.query;
    const response = await OrderSchema.find({ customer_id: customer_id })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(new ApiResponse(response, "Orders found", 200));
  } catch (err) {
    next(err);
  }
};

exports.findAllByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const response = await OrderSchema.find({
      status: status,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(new ApiResponse(response, "Orders found", 200));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const response = await OrderSchema.findById(order_id);

    return res.status(200).json(new ApiResponse(response, "Order found", 200));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { order_id } = req.params;

    const response = await OrderSchema.findByIdAndDelete(order_id);

    if (!response) {
      throw new ApiError("Order Not Found", 404, "OrderNotFound");
    }

    return res.status(200).json(new ApiResponse(null, "Order deleted", 200));
  } catch (err) {
    next(err);
  }
};

exports.findAllByItem = async (req, res, next) => {
  try {
    const response = await OrderSchema.find({ items: req.query })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(new ApiResponse(response, "Orders found", 200));
  } catch (err) {
    next(err);
  }
};
