const express = require("express");
const cors = require("cors");
const { CORS_ORIGIN } = require("./config");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");
const DishRouter = require("./routes/dish.routes");
const OrderRouter = require("./routes/order.routes");
const CustomerRouter = require("./routes/customer.routes");
const InventoryRouter = require("./routes/inventory.routes");

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use("/api/dish", DishRouter);
app.use("/api/order", OrderRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/inventory", InventoryRouter);

app.use(errorHandler);

module.exports = app;
