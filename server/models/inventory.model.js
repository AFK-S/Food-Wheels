const { Schema, connection } = require("mongoose");

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Item Name is required"],
    },
    category: {
      type: String,
      trim: true,
      enum: ["veg", "meat", "other"],
      required: [true, "Category is required"],
      default: "other",
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
