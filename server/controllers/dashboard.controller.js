const OrderSchema = require("../models/order.model");
const ApiResponse = require("../utils/ApiResponse");

exports.todayOrders = async (req, res, next) => {
  try {
    const order_completed = await OrderSchema.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: new Date(new Date().setHours(00, 00, 00)),
            $lt: new Date(new Date().setHours(23, 59, 59)),
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

    const order_pending = await OrderSchema.aggregate([
      {
        $match: {
          status: {
            $nin: ["delivered", "cancelled"],
          },
          createdAt: {
            $gte: new Date(new Date().setHours(00, 00, 00)),
            $lt: new Date(new Date().setHours(23, 59, 59)),
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

    return res.status(200).json(
      new ApiResponse(
        {
          order_completed,
          order_pending,
        },
        "Order found",
        200
      )
    );
  } catch (err) {
    next(err);
  }
};
