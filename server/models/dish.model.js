const { Schema, connection } = require("mongoose");

const DishSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a dish name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      enum: ["burger", "pizza", "pasta", "fries", "ice-cream", "donut"],
      required: [true, "Please add a category"],
    },
    image: {
      type: Object,
      required: [true, "Please add an image"],
    },
    food_type: {
      type: String,
      enum: ["veg", "non-veg", "jain"],
      required: [true, "Please add a food type"],
    },
    // in_stock: {
    //     type: Boolean,
    //     default: true,
    // },
    price: {
      original: {
        type: Number,
        required: [true, "Please add the original price"],
      },
      discounted: {
        type: Number,
        required: [true, "Please add the discounted price"],
      },
    },
    is_signature: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("Food-Wheels").model("Dish", DishSchema);
