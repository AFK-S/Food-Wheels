const DishSchema = require("../models/dish.model");
const InventorySchema = require("../models/inventory.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.create = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      food_type,
      price,
      discount,
      is_signature,
    } = req.body;

    if (!req.coverImage) {
      throw new ApiError("Dish image is required", 400, "ImageError");
    }

    const dish = await DishSchema.create({
      name: name,
      description: description,
      category: category,
      image: req.coverImage,
      food_type: food_type,
      price: {
        original: price,
        discounted: discount,
      },
      is_signature: is_signature,
    });

    return res
      .status(201)
      .json(new ApiResponse(dish, "Dish created successfully", 201));
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const dishes = await DishSchema.aggregate([
      {
        $lookup: {
          from: "inventories",
          let: {
            category: "$category",
            food_type: "$food_type",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$category", "$$category"] },
                    { $eq: ["$food_type", "$$food_type"] },
                  ],
                },
              },
            },
          ],
          as: "inventory",
        },
      },
      {
        $addFields: {
          in_stock: {
            $cond: {
              if: { $gt: [{ $size: "$inventory" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json(new ApiResponse(dishes, "Dishes found", 200));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { dish_id } = req.params;

    const response = await DishSchema.findById(dish_id)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(new ApiResponse(response, "Dish found", 200));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { dish_id } = req.params;

    const response = await DishSchema.findByIdAndDelete(dish_id);

    if (!response) {
      throw new ApiError("Dish Not Found", 404, "DishNotFound");
    }

    res.status(200).json(new ApiResponse(null, "Dish deleted", 200));
    req.public_id = response.image.public_id;
    next();
  } catch (err) {
    next(err);
  }
};
