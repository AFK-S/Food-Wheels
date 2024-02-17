const express = require("express");
const cors = require("cors");
const { CORS_ORIGIN } = require("./config");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");
const IndexRoute = require("./routes/index.routes");
const CookieRouter = require("./routes/cookie.routes");
const DishRouter = require("./routes/dish.routes");

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use("/api/field", IndexRoute);
app.use("/api/cookie", CookieRouter);
app.use("/api/dish", DishRouter);

app.use(errorHandler);

module.exports = app;
