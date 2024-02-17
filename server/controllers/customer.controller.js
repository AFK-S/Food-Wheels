const CustomerSchema = require("../models/customer.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.register = async (req, res, next) => {
  try {
    const { name, email_address, password } = req.body;

    const customerExists = await CustomerSchema.findOne({
      email_address: email_address,
    });

    if (customerExists) {
      throw new ApiError("Customer already exists", 400);
    }

    const customer = await CustomerSchema.create({
      name: name,
      email_address: email_address,
      password: password,
    });

    return res
      .status(201)
      .cookie("customer_id", customer._id, {
        maxAge: 1000 * 60 * 10, // 10 minute
      })
      .json(new ApiResponse(customer, "Customer register successfully", 201));
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email_address, password } = req.body;

    const customer = await CustomerSchema.findOne({
      email_address: email_address,
      password: password,
    });

    if (!customer) {
      return next(new ApiError("Invalid Credentials", 401));
    }

    return res
      .status(200)
      .cookie("customer_id", customer._id, {
        maxAge: 1000 * 60 * 10, // 10 minute
      })
      .json(new ApiResponse(customer, "Customer logged in", 200));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { customer_id } = req.params;
    const response = await CustomerSchema.findById(customer_id);

    return res
      .status(200)
      .json(new ApiResponse(response, "Customer found", 200));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { customer_id } = req.params;
    const response = await CustomerSchema.findByIdAndDelete(customer_id);

    if (!response) {
      return next(new ApiError("Customer not found", 404));
    }

    return res
      .status(200)
      .json(new ApiResponse(response, "Customer deleted", 200));
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("customer_id")
      .json(new ApiResponse(null, "Customer logged out", 200));
  } catch (err) {
    next(err);
  }
};
