const express = require("express");
const cors = require("cors");
const { CORS_ORIGIN } = require("./config");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");
const DishRouter = require("./routes/dish.routes");
const OrderRouter = require("./routes/order.routes");
const CustomerRouter = require("./routes/customer.routes");
const InventoryRouter = require("./routes/inventory.routes");
const socketIo = require("socket.io");
const socket = require("./socket");
const { createServer } = require("http");

const app = express();
const server = createServer(app);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

const io = socketIo(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/dish", DishRouter);
app.use("/api/order", OrderRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/inventory", InventoryRouter);

app.use(errorHandler);

socket(io);

module.exports = server;
