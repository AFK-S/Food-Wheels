const OrderSchema = require("../models/order.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const mongoose = require("mongoose");

exports.create = async (req, res, next) => {
  try {
    const { customer_id, items, note, total } = req.body;

    const order = await OrderSchema.create({
      customer_id: customer_id,
      items: items,
      note: note,
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
    const { customer_id } = req.params;
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
    const response = await OrderSchema.aggregate([
      {
        $match: {
          status: {
            $nin: [...status],
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $addFields: {
          customer_name: "$customer.name",
        },
      },
      {
        $project: {
          customer: 0,
        },
      },
      {
        $lookup: {
          from: "dishes",
          localField: "items.dish_id",
          foreignField: "_id",
          as: "dishes",
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              in: {
                $let: {
                  vars: {
                    d: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$dishes",
                            cond: {
                              $eq: ["$$dish._id", "$$this.dish_id"],
                            },
                            as: "dish",
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    $mergeObjects: [
                      "$$this",
                      {
                        dish_name: "$$d.name",
                        description: "$$d.description",
                        category: "$$d.category",
                        food_type: "$$d.food_type",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          dishes: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json(new ApiResponse(response, "Orders found", 200));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { order_id } = req.params;

    const response = await OrderSchema.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(order_id),
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $addFields: {
          customer_name: "$customer.name",
        },
      },
      {
        $project: {
          customer: 0,
        },
      },
      {
        $lookup: {
          from: "dishes",
          localField: "items.dish_id",
          foreignField: "_id",
          as: "dishes",
        },
      },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              in: {
                $let: {
                  vars: {
                    d: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$dishes",
                            cond: {
                              $eq: ["$$dish._id", "$$this.dish_id"],
                            },
                            as: "dish",
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    $mergeObjects: [
                      "$$this",
                      {
                        dish_name: "$$d.name",
                        description: "$$d.description",
                        category: "$$d.category",
                        food_type: "$$d.food_type",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          dishes: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(response[0] || null, "Order found", 200));
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

exports.feedback = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const { feedback } = req.body;

    const response = await OrderSchema.findByIdAndUpdate(order_id, {
      feedback: feedback,
    });

    if (!response) {
      throw new ApiError("Order Not Found", 404, "OrderNotFound");
    }

    return res.status(200).json(new ApiResponse(null, "Feedback added", 200));
  } catch (err) {
    next(err);
  }
};

exports.rating = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const { rating } = req.body;

    const response = await OrderSchema.findByIdAndUpdate(order_id, {
      rating: rating,
    });

    if (!response) {
      throw new ApiError("Order Not Found", 404, "OrderNotFound");
    }

    return res.status(200).json(new ApiResponse(null, "Rating added", 200));
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const response = await OrderSchema.findByIdAndUpdate(order_id, {
      status: status,
    }).lean();

    if (!response) {
      throw new ApiError(null, 404, "OrderNotFound");
    }

    return res.status(200).json(new ApiResponse(null, "Status updated", 200));
  } catch (err) {
    next(err);
  }
};
