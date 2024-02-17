const { Schema, connection } = require("mongoose");

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email_address: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection
  .useDb("Food-Wheels")
  .model("Customer", CustomerSchema);
