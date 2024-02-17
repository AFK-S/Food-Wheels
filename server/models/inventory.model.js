const { Schema, connection } = require("mongoose");

const inventorySchema = new Schema(
  {
    category: {
      type: String,
      enum: ["burger", "pizza", "pasta", "fries", "ice-cream", "donut"],
      required: [true, "Please add a category"],
    },
    food_type: {
      type: String,
      enum: ["veg", "non-veg", "jain"],
      required: [true, "Please add a food type"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection
  .useDb("Food-Wheels")
  .model("Inventory", inventorySchema);
