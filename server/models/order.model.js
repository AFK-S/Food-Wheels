const { Schema, connection } = require("mongoose");

const OrderSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide customer id"],
    },
    items: [
      {
        dish_id: {
          type: Schema.Types.ObjectId,
          ref: "Dish",
          required: [true, "Please provide dish id"],
        },
        quantity: {
          type: Number,
          default: 1,
          required: [true, "Please add a quantity"],
        },
        note: {
          type: String,
          default: "",
        },
        billing_price: {
          type: Number,
          required: [true, "Please add the billing price"],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "Please add the total amount"],
    },
    status: {
      type: String,
      enum: ["placed", "confirmed", "preparing", "delivered", "cancelled"],
      default: "placed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("Food-Wheels").model("Order", OrderSchema);
