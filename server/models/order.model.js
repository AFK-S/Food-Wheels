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
    note: {
      type: String,
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      max: 5,
    },
    sector: {
      type: String,
      enum: ["hygiene", "taste", "experience", null],
      default: null,
    },
    coordinates: {
      type: Object,
      default: {
        latitude: 0,
        longitude: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("Food-Wheels").model("Order", OrderSchema);
